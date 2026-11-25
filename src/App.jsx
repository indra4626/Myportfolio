import { useEffect, useRef, useState } from 'react'
import './styles.css'

const asset = (name) => `${import.meta.env.BASE_URL}${name}`
const BIRTH_DATE = new Date('2004-11-11T00:20:18+05:30')
const GITHUB_URL = 'https://github.com/indra4626'
const LINKEDIN_URL = 'https://www.linkedin.com/in/indra-hembram-ece'
const EMAIL = 'hembramindra1@gmail.com'
const PI_DIGITS = (() => {
  let q = 1n
  let r = 0n
  let t = 1n
  let k = 1n
  let n = 3n
  let l = 3n
  let digits = ''

  while (digits.length < 1001) {
    if (4n * q + r - t < n * t) {
      const previousR = r
      digits += n.toString()
      r = 10n * (previousR - n * t)
      n = (10n * (3n * q + previousR)) / t - 10n * n
      q *= 10n
    } else {
      const previousR = r
      r = (2n * q + previousR) * l
      n = (q * (7n * k) + 2n + previousR * l) / (t * l)
      q *= k
      t *= l
      l += 2n
      k += 1n
    }
  }

  return digits
})()

const PROJECTS = [
  {
    title: 'TRIAC fan speed controller',
    year: '2026',
    preview: 'triac',
    idea: 'Power delivered follows the sine-wave area after firing angle α.',
    description: 'A TRIAC-based AC fan speed controller using phase-angle control.',
    problem: 'Vary AC fan power by controlling the TRIAC firing angle.',
    stack: ['TRIAC', 'Power electronics', 'AC fan control'],
    linkNote: 'Project URL not provided.',
  },
  {
    title: 'SESWA Registration and Event Management System',
    year: '2026',
    preview: 'sets',
    idea: 'Registration and attendance sets reveal who signed up, attended, and overlaps.',
    description: 'React.js and Firebase event platform developed for the SESWA Freshers’ Welcome and Cultural Program; used in live operations with 350+ participants from multiple engineering colleges.',
    problem: 'Manage event registrations and operations for a large, multi-college audience.',
    stack: ['React.js', 'Firebase'],
    linkNote: 'Live project; direct URL is not listed in the resume.',
  },
  {
    title: 'Solar Powered Air Pollution Detector',
    year: '2025',
    preview: 'sensor',
    idea: 'Solar power supports continuous MQ135 air-quality sensing.',
    description: 'Low-cost solar-powered air-quality monitoring system built with Arduino Uno and an MQ135 gas sensor, designed for environmental monitoring and public awareness.',
    problem: 'Provide affordable air-quality monitoring without relying on mains power.',
    stack: ['Arduino Uno', 'MQ135 sensor', 'Solar panel'],
    linkNote: 'GitHub project; direct repository URL is not listed in the resume.',
  },
  {
    title: 'Gulu AI Assistant',
    year: '2025',
    preview: 'assistant',
    idea: 'A prompt-response interface turns conversation into an interaction workflow.',
    description: 'Browser-based AI assistant interface supporting conversational interaction workflows.',
    problem: 'Provide a browser interface for conversational AI interactions.',
    stack: ['AI assistant interface', 'Browser-based UI'],
    linkNote: 'Live project; direct URL is not listed in the resume.',
  },
]

const ABOUT_ITEMS = [
  ['Education', 'B.Tech in Electronics and Communication Engineering at Kalyani Government Engineering College (2022–2026), CGPA 6.8. Higher Secondary at Dhaniakhali Mahamaya Vidyamandir, 87.4%.'],
  ['Training', 'Airports Authority of India: CNS and ATC, Kolkata. Damodar Valley Corporation: SCADA and power-grid monitoring, Howrah. Both trainings included certificates.'],
  ['Projects', 'TRIAC fan speed controller, SESWA event platform, solar-powered air-pollution detector, and Gulu AI Assistant.'],
  ['Leadership', 'NSS volunteer. General Secretary and Organizing Lead of SESWA. Convener of Chitrank, KGEC Art Club, leading 70+ members.'],
  ['Skills', 'Communication, team coordination, event management, Arduino, Python, C, MATLAB, React.js, Firebase, Cisco Packet Tracer, Git, and GitHub.'],
  ['Interests', 'Mathematics, calculus, Ramanujan’s work, embedded and power electronics, communication systems, and industrial automation.'],
  ['Languages', 'Bengali, English, Hindi, and Santali.'],
]

function isPrime(number) {
  if (number < 2) return false
  if (number % 2 === 0) return number === 2
  if (number % 3 === 0) return number === 3
  for (let divisor = 5; divisor * divisor <= number; divisor += 6) {
    if (number % divisor === 0 || number % (divisor + 2) === 0) return false
  }
  return true
}

function isPalindrome(number) {
  const digits = String(number)
  return digits === [...digits].reverse().join('')
}

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.18 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}

function useInView() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = (event) => setPrefersReducedMotion(event.matches)

    if (preference.addEventListener) preference.addEventListener('change', updatePreference)
    else preference.addListener(updatePreference)

    return () => {
      if (preference.removeEventListener) preference.removeEventListener('change', updatePreference)
      else preference.removeListener(updatePreference)
    }
  }, [])

  return prefersReducedMotion
}

function PiWalkBackground({ motionEnabled }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const points = [{ x: 0, y: 0 }]
    let x = 0
    let y = 0
    let frame = 0
    let width = 0
    let height = 0
    const start = performance.now()
    const reducedMotion = !motionEnabled

    PI_DIGITS.slice(1, 161).split('').forEach((digit) => {
      const radians = Number(digit) * Math.PI / 5
      x += Math.cos(radians)
      y += Math.sin(radians)
      points.push({ x, y })
    })

    const pathBounds = points.reduce((result, point) => ({
      minX: Math.min(result.minX, point.x),
      maxX: Math.max(result.maxX, point.x),
      minY: Math.min(result.minY, point.y),
      maxY: Math.max(result.maxY, point.y),
    }), { minX: 0, maxX: 0, minY: 0, maxY: 0 })
    let positionedPoints = []

    const resize = () => {
      const canvasBounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = canvasBounds.width
      height = canvasBounds.height
      canvas.width = Math.max(1, Math.round(width * ratio))
      canvas.height = Math.max(1, Math.round(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      const scale = Math.min(
        (width * 0.62) / Math.max(pathBounds.maxX - pathBounds.minX, 1),
        (height * 0.64) / Math.max(pathBounds.maxY - pathBounds.minY, 1),
      )
      const centerX = width * 0.68
      const centerY = height * 0.5
      positionedPoints = points.map((point) => [
        centerX + (point.x - (pathBounds.minX + pathBounds.maxX) / 2) * scale,
        centerY + (point.y - (pathBounds.minY + pathBounds.maxY) / 2) * scale,
      ])
      if (reducedMotion) draw(performance.now())
    }

    const draw = (time) => {
      const elapsed = (time - start) % 11000
      const progress = reducedMotion ? 1 : Math.min(elapsed / 9000, 1)
      const fade = reducedMotion ? 1 : Math.max(0, 1 - Math.max(0, elapsed - 9000) / 2000)
      const lastPoint = Math.max(1, Math.floor(progress * (points.length - 1)))

      context.clearRect(0, 0, width, height)
      context.beginPath()
      for (let index = 0; index <= lastPoint; index += 1) {
        const [pointX, pointY] = positionedPoints[index]
        if (index === 0) context.moveTo(pointX, pointY)
        else context.lineTo(pointX, pointY)
      }
      context.strokeStyle = `rgba(200, 162, 74, ${0.32 * fade})`
      context.lineWidth = 1.2
      context.stroke()

      const [endX, endY] = positionedPoints[lastPoint]
      context.beginPath()
      context.arc(endX, endY, 2.5, 0, Math.PI * 2)
      context.fillStyle = `rgba(232, 196, 106, ${0.62 * fade})`
      context.fill()

      if (!reducedMotion) frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [motionEnabled])

  return <canvas ref={canvasRef} className="pi-walk-background" aria-hidden="true" />
}

function GeometricPortrait({ motionEnabled }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const image = new Image()
    const reducedMotion = !motionEnabled
    let triangles = []
    let revealOrder = []
    let frame = 0
    let width = 0
    let height = 0
    let startedAt = 0
    let imageReady = false
    let isVisible = !('IntersectionObserver' in window)
    let observer

    const draw = (time) => {
      const linearProgress = reducedMotion ? 1 : Math.min((time - startedAt) / 4200, 1)
      const progress = linearProgress * linearProgress * (3 - 2 * linearProgress)
      const visibleCount = Math.floor(progress * triangles.length)
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
      const imageWidth = image.naturalWidth * scale
      const imageHeight = image.naturalHeight * scale
      const imageX = (width - imageWidth) / 2
      const imageY = (height - imageHeight) / 2

      context.clearRect(0, 0, width, height)
      context.globalAlpha = 0.06
      context.drawImage(image, imageX, imageY, imageWidth, imageHeight)
      context.globalAlpha = 1

      for (let index = 0; index < visibleCount; index += 1) {
        const triangle = triangles[revealOrder[index]]
        context.beginPath()
        context.moveTo(...triangle[0])
        context.lineTo(...triangle[1])
        context.lineTo(...triangle[2])
        context.closePath()
        context.save()
        context.clip()
        context.drawImage(image, imageX, imageY, imageWidth, imageHeight)
        context.restore()
      }

      if (visibleCount < triangles.length) frame = requestAnimationFrame(draw)
    }

    const resize = () => {
      cancelAnimationFrame(frame)
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.max(1, Math.round(width * ratio))
      canvas.height = Math.max(1, Math.round(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const columns = 8
      const rows = 8
      const points = Array.from({ length: rows + 1 }, (_, row) => (
        Array.from({ length: columns + 1 }, (_, column) => [
          column * width / columns + (column > 0 && column < columns ? (Math.random() - 0.5) * width / columns * 0.45 : 0),
          row * height / rows + (row > 0 && row < rows ? (Math.random() - 0.5) * height / rows * 0.45 : 0),
        ])
      ))
      triangles = []

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const topLeft = points[row][column]
          const topRight = points[row][column + 1]
          const bottomLeft = points[row + 1][column]
          const bottomRight = points[row + 1][column + 1]
          if ((row + column) % 2 === 0) {
            triangles.push([topLeft, topRight, bottomRight], [topLeft, bottomRight, bottomLeft])
          } else {
            triangles.push([topLeft, topRight, bottomLeft], [topRight, bottomRight, bottomLeft])
          }
        }
      }

      revealOrder = triangles.map((_, index) => index)
      const goldenRatio = (1 + Math.sqrt(5)) / 2
      const spiralGrowth = 2 * Math.log(goldenRatio) / Math.PI
      const spiralStart = Math.min(width, height) * 0.42 / goldenRatio ** 8
      const spiralTurns = Math.PI * 4
      revealOrder = revealOrder.map((triangleIndex) => {
        const triangle = triangles[triangleIndex]
        const centerX = (triangle[0][0] + triangle[1][0] + triangle[2][0]) / 3
        const centerY = (triangle[0][1] + triangle[1][1] + triangle[2][1]) / 3
        const deltaX = centerX - width / 2
        const deltaY = centerY - height / 2
        const distanceFromCenter = Math.hypot(deltaX, deltaY)
        const direction = (Math.atan2(deltaY, deltaX) + Math.PI * 2) % (Math.PI * 2)
        let nearestAngle = 0
        let nearestDistance = Infinity

        for (let turn = 0; turn <= 2; turn += 1) {
          const angle = Math.min(direction + turn * Math.PI * 2, spiralTurns)
          const radius = spiralStart * Math.exp(spiralGrowth * angle)
          const phaseDifference = Math.abs(direction - angle) % (Math.PI * 2)
          const angleDifference = Math.min(phaseDifference, Math.PI * 2 - phaseDifference)
          const distance = Math.hypot(distanceFromCenter - radius, distanceFromCenter * angleDifference)
          if (distance < nearestDistance) {
            nearestAngle = angle
            nearestDistance = distance
          }
        }

        return { triangleIndex, angle: nearestAngle, distance: nearestDistance }
      }).sort((first, second) => first.angle - second.angle || first.distance - second.distance)
        .map(({ triangleIndex }) => triangleIndex)
      startedAt = performance.now()
      if (imageReady && isVisible) frame = requestAnimationFrame(draw)
    }

    const handleImageLoad = () => {
      if (imageReady) return
      imageReady = true
      resize()
      window.addEventListener('resize', resize)
    }
    const handleImageError = () => console.error('Unable to load geometric portrait: geo_profile.jpeg')

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible && imageReady) {
          startedAt = performance.now()
          frame = requestAnimationFrame(draw)
        } else {
          cancelAnimationFrame(frame)
        }
      }, { threshold: 0.18 })
      observer.observe(canvas)
    }

    image.onload = handleImageLoad
    image.onerror = handleImageError
    image.src = asset('geo_profile.jpeg')
    if (image.complete && image.naturalWidth) handleImageLoad()

    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('resize', resize)
      image.onload = null
      image.onerror = null
    }
  }, [motionEnabled])

  return <canvas ref={canvasRef} className="geo-portrait-canvas" role="img" aria-label="Geometric portrait of Indra Hembram revealing one section at a time" />
}

function AgeCounter({ seconds, base, onBaseChange }) {
  const prime = isPrime(seconds)
  const palindrome = isPalindrome(seconds)
  const display = base === 10
    ? seconds.toLocaleString('en-US')
    : `${base === 2 ? '0b' : '0x'}${seconds.toString(base).toUpperCase()}`
  const badges = [prime && 'prime second', palindrome && 'palindrome second'].filter(Boolean)

  return (
    <div className="age" aria-label="Live age counter">
      <div className="lbl">Seconds I have been alive</div>
      <div className="num" aria-live="off">{display}</div>
      <div className="yrs">{(seconds / 31556952).toFixed(9)} years</div>
      <div className={`badge ${badges.length ? 'on' : ''}`} aria-live="polite">{badges.join(' and ')}</div>
      <div className="seg" role="group" aria-label="Number base">
        {[['10', 'Decimal'], ['2', 'Binary'], ['16', 'Hexadecimal']].map(([value, label]) => (
          <button key={value} type="button" aria-pressed={base === Number(value)} onClick={() => onBaseChange(Number(value))}>{label}</button>
        ))}
      </div>
    </div>
  )
}

function Hero({ seconds, base, onBaseChange, motionEnabled }) {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1>Indra Hembram</h1>
          <p className="hero-subtitle">Electronics and Communication Engineer. I look for the equation under every system.</p>
          <AgeCounter seconds={seconds} base={base} onBaseChange={onBaseChange} />
        </div>
        <figure className="geo-portrait-window">
          <GeometricPortrait motionEnabled={motionEnabled} />
          <figcaption className="portrait-caption"><span>Geometric portrait</span><span>Golden spiral · auto on view</span></figcaption>
        </figure>
      </div>
    </header>
  )
}

function About() {
  return (
    <section id="about">
      <div className="wrap">
        <p className="eyebrow">A little about me</p>
        <h2>Engineering, with people in mind</h2>
        <p className="lead">I am Indra Hembram, an Electronics and Communication Engineering student at Kalyani Government Engineering College (2022–2026), based in Kalyani, West Bengal. My training includes CNS and ATC systems at Airports Authority of India and SCADA power-grid monitoring at Damodar Valley Corporation. I build practical systems in event management, environmental monitoring, AI interfaces, and power electronics. I serve as General Secretary of SESWA and Convener of Chitrank, KGEC Art Club, and I am seeking a government or core engineering role.</p>
        <div className="about-grid">
          {ABOUT_ITEMS.map(([title, text]) => <article className="about-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </div>
    </section>
  )
}

function Resume() {
  const resumeUrl = asset('resume.pdf')

  return (
    <section id="resume">
      <div className="wrap">
        <p className="eyebrow">Background</p>
        <h2>Resume, as a proof</h2>
        <p className="lead">A visual summary of my education, experience, projects, and skills.</p>
        <div className="resume-actions">
          <a className="btn" href={resumeUrl} download="Indra-Hembram-Resume.pdf">Download resume PDF</a>
        </div>
        <article className="resume-visual" aria-labelledby="resume-name">
          <div className="resume-visual-ornament" aria-hidden="true">
            <span>Σ Fₙ</span><span>π² + φ</span><span>φ² = φ + 1</span>
          </div>
          <header className="resume-visual-header">
            <p className="resume-kicker">Engineering · Systems · Community</p>
            <h3 id="resume-name">Indra Hembram</h3>
            <p className="resume-role">Electronics and Communication Engineer</p>
            <ul className="resume-contact-list">
              <li><a href="tel:+919382091267">+91-9382091267</a></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a></li>
              <li>Kalyani, West Bengal</li>
            </ul>
          </header>
          <div className="resume-visual-sections">
            <section className="resume-detail-block">
              <h4 className="resume-section-title"><span className="resume-section-index">01</span>Professional summary</h4>
              <p>Electronics and Communication Engineering undergraduate with experience in leadership, community engagement, technical projects, and large-scale student coordination. Skilled in communication, teamwork, event management, and problem-solving through NSS initiatives, organizational responsibilities, and project-based learning.</p>
            </section>
            <section className="resume-detail-block">
              <h4 className="resume-section-title"><span className="resume-section-index">02</span>Education</h4>
              <div className="resume-entry">
                <div className="resume-entry-heading"><strong>Kalyani Government Engineering College</strong><span>Jul 2022 – Jul 2026</span></div>
                <p>B.Tech, Electronics and Communication Engineering · CGPA 6.8 · Kalyani, West Bengal</p>
              </div>
              <div className="resume-entry">
                <div className="resume-entry-heading"><strong>Dhaniakhali Mahamaya Vidyamandir</strong><span>Mar 2020 – Jun 2022</span></div>
                <p>Higher Secondary Education · 87.4% · Hooghly, West Bengal</p>
              </div>
            </section>
            <section className="resume-detail-block">
              <h4 className="resume-section-title"><span className="resume-section-index">03</span>Training and experience</h4>
              <div className="resume-entry">
                <div className="resume-entry-heading"><strong>Airports Authority of India (AAI)</strong><span>Jul 2025 · Kolkata</span></div>
                <p>CNS Department internship. Learned operational concepts of Communication, Navigation, and Surveillance systems; observed aircraft communication workflows and ATC coordination.</p>
              </div>
              <div className="resume-entry">
                <div className="resume-entry-heading"><strong>Damodar Valley Corporation (DVC)</strong><span>Jul – Aug 2025 · Howrah</span></div>
                <p>Industrial training in SCADA and power-grid monitoring, including communication flow and operational monitoring systems.</p>
              </div>
            </section>
            <section className="resume-detail-block">
              <h4 className="resume-section-title"><span className="resume-section-index">04</span>Community and leadership</h4>
              <div className="resume-entry">
                <div className="resume-entry-heading"><strong>SESWA · General Secretary and Organizing Lead</strong><span>Nov 2024 – Present</span></div>
                <p>Coordinated student and alumni engagement; led the Freshers’ Welcome and Annual Cultural Program for 350+ participants and 50+ alumni.</p>
              </div>
              <div className="resume-entry">
                <div className="resume-entry-heading"><strong>Chitrank, KGEC Art Club · Convener</strong><span>2025 – Present</span></div>
                <p>Led a creative team of 70+ members during the annual ESPECKTRO fest.</p>
              </div>
              <div className="resume-entry">
                <div className="resume-entry-heading"><strong>National Service Scheme (NSS), KGEC · Volunteer</strong><span>2024</span></div>
                <p>Participated in a 7-Day Special Camp and the YUVA SAMVAD: INDIA@2047 youth dialogue initiative.</p>
              </div>
            </section>
            <section className="resume-detail-block">
              <h4 className="resume-section-title"><span className="resume-section-index">05</span>Selected projects</h4>
              <div className="resume-entry">
                <div className="resume-entry-heading"><strong>SESWA Registration and Event Management System</strong><span>2026</span></div>
                <p>React.js and Firebase platform for registration and event operations across multiple engineering colleges.</p>
              </div>
              <div className="resume-entry">
                <div className="resume-entry-heading"><strong>Solar Powered Air Pollution Detector</strong><span>2025</span></div>
                <p>Arduino Uno, MQ135 gas sensor, and solar panel for low-cost air-quality monitoring.</p>
              </div>
              <div className="resume-entry">
                <div className="resume-entry-heading"><strong>Gulu AI Assistant</strong><span>2025</span></div>
                <p>Browser-based conversational assistant interface.</p>
              </div>
              <div className="resume-entry">
                <div className="resume-entry-heading"><strong>TRIAC AC Fan Speed Controller</strong><span>2026</span></div>
                <p>Phase-control circuit and firmware for AC fan-speed control.</p>
              </div>
            </section>
            <section className="resume-detail-block">
              <h4 className="resume-section-title"><span className="resume-section-index">06</span>Skills</h4>
              <dl className="resume-skills">
                <dt>Relevant</dt><dd>Communication, leadership, team coordination, event management</dd>
                <dt>Technical</dt><dd>Arduino, Python, C, MATLAB, Cisco Packet Tracer, React.js, Firebase</dd>
                <dt>Tools</dt><dd>MS Office, Git, GitHub, VS Code</dd>
                <dt>Languages</dt><dd>Bengali, English, Hindi, Santali</dd>
              </dl>
            </section>
          </div>
          <div className="resume-visual-footer" aria-hidden="true"><span>INDRA HEMBRAM</span><span>φ ≈ 1.618</span></div>
        </article>
      </div>
    </section>
  )
}

function AchievementCard({ value, suffix, label, motionEnabled }) {
  const [ref, visible] = useReveal()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) return undefined
    if (!motionEnabled) {
      setCount(value)
      return undefined
    }
    setCount(0)
    const start = performance.now()
    let frame = 0
    const animate = (time) => {
      const progress = Math.min((time - start) / 1300, 1)
      const eased = 1 - (1 - progress) ** 3
      setCount(value * eased)
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [value, visible, motionEnabled])

  const number = Number.isInteger(value) ? Math.round(count) : count.toFixed(1)
  return <article ref={ref} className="achievement"><strong>{number}{suffix}</strong><p>{label}</p></article>
}

function FibonacciArtwork() {
  const [ref, visible] = useReveal()
  const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21]
  const squares = [{ x: 0, y: 0, size: fibonacci[0] }]
  const bounds = { left: 0, right: 1, bottom: 0, top: 1 }

  fibonacci.slice(1).forEach((size, index) => {
    let x
    let y
    switch (index % 4) {
      case 0:
        x = bounds.right
        y = bounds.bottom
        bounds.right += size
        break
      case 1:
        x = bounds.left
        y = bounds.bottom - size
        bounds.bottom -= size
        break
      case 2:
        x = bounds.left - size
        y = bounds.bottom
        bounds.left -= size
        break
      default:
        x = bounds.left
        y = bounds.top
        bounds.top += size
    }
    squares.push({ x, y, size })
  })

  const scale = 220 / (bounds.top - bounds.bottom)
  const offsetX = (400 - (bounds.right - bounds.left) * scale) / 2
  const offsetY = (250 - (bounds.top - bounds.bottom) * scale) / 2
  const goldenRatio = (1 + Math.sqrt(5)) / 2
  const spiralGrowth = 2 * Math.log(goldenRatio) / Math.PI
  const spiralStart = 100 / goldenRatio ** 8
  const spiralPath = Array.from({ length: 257 }, (_, index) => {
    const angle = index / 256 * Math.PI * 4
    const radius = spiralStart * Math.exp(spiralGrowth * angle)
    const x = 200 + radius * Math.cos(angle + Math.PI)
    const y = 125 + radius * Math.sin(angle + Math.PI)
    return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
  }).join(' ')

  return (
    <div ref={ref} className={`achievement-feature ${visible ? 'visible' : ''}`}>
      <figure className="achievement-artwork">
        <svg viewBox="0 0 400 250" role="img" aria-labelledby="fibonacci-art-title">
          <title id="fibonacci-art-title">Fibonacci squares forming a golden spiral</title>
          <g className="fibonacci-squares">
            {squares.map((square, index) => (
              <rect
                key={`${square.x}-${square.y}`}
                x={offsetX + (square.x - bounds.left) * scale}
                y={offsetY + (bounds.top - square.y - square.size) * scale}
                width={square.size * scale}
                height={square.size * scale}
                style={{ '--square-index': index }}
              />
            ))}
          </g>
          <path className="achievement-spiral-path" pathLength="1" d={spiralPath} />
        </svg>
        <figcaption>Fibonacci sequence · golden spiral</figcaption>
      </figure>
      <div className="achievement-feature-copy">
        <p className="eyebrow">Creative mathematics</p>
        <h3>From sequence to spiral</h3>
        <p>Fibonacci squares grow into a golden spiral—a small study in how simple patterns create striking forms.</p>
      </div>
    </div>
  )
}

function Achievements({ motionEnabled }) {
  return (
    <section id="achievements">
      <div className="wrap">
        <p className="eyebrow">Milestones</p>
        <h2>Achievements</h2>
        <p className="lead">Numbers from my experience so far.</p>
        <div className="achievement-grid">
          <AchievementCard value={350} suffix="+" label="participants at SESWA’s Freshers’ Welcome and Annual Cultural Program, with 50+ alumni" motionEnabled={motionEnabled} />
          <AchievementCard value={70} suffix="+" label="members led as Convener of Chitrank for the ESPECKTRO fest" motionEnabled={motionEnabled} />
          <AchievementCard value={3} suffix="" label="industrial and technical trainings: AAI, DVC, and Victoria Industries" motionEnabled={motionEnabled} />
          <AchievementCard value={87.4} suffix="%" label="in Higher Secondary Education" motionEnabled={motionEnabled} />
        </div>
        <FibonacciArtwork />
      </div>
    </section>
  )
}

function ProjectPreview({ type }) {
  if (type === 'triac') return (
    <svg viewBox="0 0 400 120" role="img" aria-label="Phase controlled AC sine wave preview">
      <path d="M0 60 H400" className="axis" />
      <path d="M0 60 C20 60 25 17 50 17 S80 103 100 103 S130 17 150 17 S180 103 200 103 S230 17 250 17 S280 103 300 103 S330 17 350 17 S380 103 400 103" className="wave-line" />
    </svg>
  )
  if (type === 'sets') return (
    <svg viewBox="0 0 400 120" role="img" aria-label="Overlapping attendee sets preview">
      <circle cx="160" cy="60" r="44" className="set-circle" /><circle cx="240" cy="60" r="44" className="set-circle" />
      <text x="128" y="65">Registered</text><text x="271" y="65">Attended</text><text x="200" y="65">∩</text>
    </svg>
  )
  if (type === 'sensor') return (
    <svg viewBox="0 0 400 120" role="img" aria-label="Air quality sensor response preview">
      <path d="M0 108 C80 104 110 93 160 72 S250 35 400 16" className="wave-line" />
      <text x="12" y="20">Air quality response</text><text x="315" y="108">time</text>
    </svg>
  )
  return (
    <svg viewBox="0 0 400 120" role="img" aria-label="AI prompt and response preview">
      <rect x="20" y="28" width="130" height="64" rx="8" className="set-box" /><rect x="250" y="28" width="130" height="64" rx="8" className="set-box" />
      <path d="M155 60h85m-10-8 10 8-10 8" className="wave-line" /><text x="85" y="64">PROMPT</text><text x="315" y="64">RESPONSE</text>
    </svg>
  )
}

function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  return (
    <dialog ref={dialogRef} className="project-dialog" onClose={onClose} onClick={(event) => { if (event.target === dialogRef.current) onClose() }}>
      {project && (
        <>
          <div className="dialog-heading"><div><p className="eyebrow">Project details · {project.year}</p><h3>{project.title}</h3></div><button className="icon-button" type="button" aria-label="Close project details" onClick={onClose}>×</button></div>
          <dl className="project-details">
            <dt>What it is</dt><dd>{project.description}</dd>
            <dt>Problem solved</dt><dd>{project.problem}</dd>
            <dt>Tech stack</dt><dd className="chips">{project.stack.map((item) => <span key={item}>{item}</span>)}</dd>
            <dt>Project link</dt><dd>{project.linkNote}</dd>
            <dt>Math preview</dt><dd className="preview"><ProjectPreview type={project.preview} /></dd>
          </dl>
          <div className="dialog-actions"><a className="btn btn-outline" href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub profile</a><a className="btn btn-outline" href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn profile</a></div>
        </>
      )}
    </dialog>
  )
}

function Projects() {
  const [activeProject, setActiveProject] = useState(null)
  const [sectionRef, sectionVisible] = useInView()

  return (
    <section id="projects" ref={sectionRef}>
      <div className="wrap">
        <p className="eyebrow">Selected work</p>
        <h2>Projects</h2>
        <p className="lead">Projects flow along a sine wave. Select one to see the details.</p>
        <div className={`project-grid ${sectionVisible ? 'visible' : ''}`}>
          <svg className="sine-wave" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 100 C125 35 250 35 375 100 S625 165 750 100 S875 35 1000 100" /></svg>
          {PROJECTS.map((project, index) => (
            <button className="project-card" key={project.title} style={{ '--offset': `${Math.sin((index + 0.5) * Math.PI / 2) * 24}px` }} type="button" onClick={() => setActiveProject(project)} aria-haspopup="dialog">
              <span className="project-year">{project.year}</span><h3>{project.title}</h3><p>{project.idea}</p><ProjectPreview type={project.preview} /><span className="project-open">View details ↗</span>
            </button>
          ))}
        </div>
      </div>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}

function spectrumFor(frequencies) {
  const size = 256
  return Array.from({ length: 25 }, (_, bin) => {
    let real = 0
    let imaginary = 0
    for (let sample = 0; sample < size; sample += 1) {
      let signal = 0
      frequencies.forEach((frequency, index) => {
        signal += [1, 0.6, 0.35][index] * Math.sin(2 * Math.PI * frequency * sample / size)
      })
      real += signal * Math.cos(2 * Math.PI * bin * sample / size)
      imaginary -= signal * Math.sin(2 * Math.PI * bin * sample / size)
    }
    return Math.hypot(real, imaginary) / size * 2
  })
}

function MathLab({ motionEnabled }) {
  const canvasRef = useRef(null)
  const [mode, setMode] = useState('fft')
  const [frequencies, setFrequencies] = useState([3, 7, 12])
  const [angle, setAngle] = useState(137.508)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const spectrum = spectrumFor(frequencies)
    let width = 0
    let height = 0
    let frame = 0
    let start = performance.now()
    const reduceMotion = !motionEnabled
    let isVisible = !('IntersectionObserver' in window)
    let observer

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.max(1, Math.round(width * ratio))
      canvas.height = Math.max(1, Math.round(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      if (isVisible) {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(draw)
      }
    }

    const draw = (time) => {
      frame = 0
      context.clearRect(0, 0, width, height)
      if (mode === 'fft') {
        const midline = height * 0.34
        context.strokeStyle = 'rgba(200,162,74,.25)'
        context.beginPath(); context.moveTo(0, midline); context.lineTo(width, midline); context.stroke()
        context.strokeStyle = '#E8E4D8'; context.lineWidth = 1.5; context.beginPath()
        for (let index = 0; index <= 256; index += 1) {
          const signal = frequencies.reduce((sum, frequency, part) => sum + [1, 0.6, 0.35][part] * Math.sin(2 * Math.PI * frequency * (index / 256 + (reduceMotion ? 0 : (time - start) * 0.00002 * (part + 1)))), 0)
          const x = index / 256 * width
          const y = midline - signal * height * 0.13
          if (index === 0) context.moveTo(x, y)
          else context.lineTo(x, y)
        }
        context.stroke()
        const maximum = Math.max(...spectrum, 1)
        const barWidth = width / spectrum.length
        context.fillStyle = '#C8A24A'
        spectrum.forEach((magnitude, bin) => {
          const barHeight = magnitude / maximum * height * 0.3
          context.fillRect(bin * barWidth + barWidth * 0.2, height * 0.94 - barHeight, barWidth * 0.6, barHeight)
        })
        context.fillStyle = '#8F8C80'; context.font = '12px ui-monospace, monospace'
        context.fillText('time-domain signal', 10, 18); context.fillText('frequency spectrum', 10, height * 0.59)
      } else if (mode === 'sun') {
        const radians = angle * Math.PI / 180
        const count = reduceMotion ? 700 : Math.min(700, Math.floor((time - start) / 10))
        const radius = Math.min(width, height) * 0.47
        const scale = radius / Math.sqrt(700)
        for (let index = 1; index <= count; index += 1) {
          const distance = scale * Math.sqrt(index)
          const theta = index * radians
          context.fillStyle = `rgba(200,162,74,${0.35 + 0.65 * index / 700})`
          context.beginPath(); context.arc(width / 2 + distance * Math.cos(theta), height / 2 + distance * Math.sin(theta), 2.2, 0, Math.PI * 2); context.fill()
        }
      }
      const sunflowerComplete = mode !== 'sun' || Math.floor((time - start) / 10) >= 700
      if (!reduceMotion && isVisible && (mode === 'fft' || !sunflowerComplete)) frame = requestAnimationFrame(draw)
    }

    resize()
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting
        cancelAnimationFrame(frame)
        frame = 0
        if (isVisible) {
          start = performance.now()
          frame = requestAnimationFrame(draw)
        }
      }, { threshold: 0.01 })
      observer.observe(canvas)
    }
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [angle, frequencies, mode, motionEnabled])

  const updateFrequency = (index, value) => setFrequencies((current) => current.map((frequency, currentIndex) => currentIndex === index ? Number(value) : frequency))

  return (
    <section id="math-lab">
      <div className="wrap">
        <p className="eyebrow">Explore</p><h2>Math Lab</h2>
        <p className="lead">Explore signals and the golden angle.</p>
        <div className="lab-panel">
          <div className="tabs" role="group" aria-label="Math demonstration">
            <button type="button" aria-pressed={mode === 'fft'} onClick={() => setMode('fft')}>Sine and FFT</button>
            <button type="button" aria-pressed={mode === 'sun'} onClick={() => setMode('sun')}>Golden-angle sunflower</button>
          </div>
          <canvas ref={canvasRef} className="lab-canvas" aria-label={mode === 'fft' ? 'Signal and frequency spectrum chart' : 'Golden-angle sunflower pattern'} role="img" />
          <div className="controls">
            {mode === 'fft' ? frequencies.map((frequency, index) => (
              <label key={index}>Frequency {index + 1}: {frequency}<input type="range" min="1" max="24" value={frequency} onChange={(event) => updateFrequency(index, event.target.value)} /></label>
            )) : (
              <label>Angle: {angle.toFixed(3)}°<input type="range" min="130" max="145" step="0.001" value={angle} onChange={(event) => setAngle(Number(event.target.value))} /></label>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact">
      <div className="wrap contact-wrap">
        <p className="eyebrow">Get in touch</p><h2>Contact, solved step by step</h2>
        <ol className="contact-steps">
          <li><span>Given</span><p>You + Idea = ?</p></li>
          <li><span>Let</span><p>C = (You + Idea) × Indra</p></li>
          <li><span>Expand</span><p>C = You × Indra + Idea × Indra</p></li>
          <li><span>Solve</span><a className="btn" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li><span>Therefore</span><div><a className="btn btn-outline" href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a><a className="btn btn-outline" href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a></div></li>
        </ol>
      </div>
    </section>
  )
}

function CursorTrail({ motionEnabled }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!motionEnabled || !window.matchMedia('(pointer: fine)').matches) return undefined
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return undefined
    const points = []
    let frame = 0
    let width = 0
    let height = 0
    let pixelRatio = 1
    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      points.length = 0
    }
    const draw = (now) => {
      frame = 0
      context.clearRect(0, 0, width, height)
      while (points.length && now - points[0][2] > 650) points.shift()
      for (let index = 1; index < points.length; index += 1) {
        context.strokeStyle = `rgba(200,162,74,${Math.max(0, 1 - (now - points[index][2]) / 650)})`
        context.lineWidth = 1.3; context.beginPath(); context.moveTo(points[index - 1][0], points[index - 1][1]); context.lineTo(points[index][0], points[index][1]); context.stroke()
      }
      if (points.length) frame = requestAnimationFrame(draw)
    }
    const move = (event) => {
      points.push([event.clientX, event.clientY, performance.now()])
      if (!frame) frame = requestAnimationFrame(draw)
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
    }
  }, [motionEnabled])

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />
}

export default function App() {
  const [mathMode, setMathMode] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [motionOverride, setMotionOverride] = useState(null)
  const [motionEnabled, setMotionEnabled] = useState(() => {
    try {
      const savedPreference = window.localStorage.getItem('indra-portfolio-motion')
      if (savedPreference !== null) return savedPreference === 'true'
    } catch {}
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const [numberBase, setNumberBase] = useState(10)
  const [now, setNow] = useState(() => Date.now())
  const [shareLabel, setShareLabel] = useState('Copy website link')
  const isHosted = typeof window !== 'undefined' && window.location.protocol !== 'file:'
  const motionActive = motionOverride === null ? motionEnabled && !prefersReducedMotion : motionOverride
  const seconds = Math.max(0, Math.floor((now - BIRTH_DATE.getTime()) / 1000))

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = motionActive ? '' : 'auto'
    return () => { root.style.scrollBehavior = previousScrollBehavior }
  }, [motionActive])

  const copyWebsiteLink = async () => {
    const url = new URL(import.meta.env.BASE_URL, window.location.origin).href
    try {
      await navigator.clipboard.writeText(url)
      setShareLabel('Website link copied')
    } catch {
      window.prompt('Copy website link', url)
    }
  }

  const toggleMotion = () => {
    const nextEnabled = !motionActive
    setMotionOverride(nextEnabled)
    setMotionEnabled(nextEnabled)
    try {
      window.localStorage.setItem('indra-portfolio-motion', String(nextEnabled))
    } catch {}
  }

  return (
    <div className={`app ${mathMode ? 'math-mode' : ''} ${motionActive ? 'motion-enabled' : ''}`}>
      <PiWalkBackground motionEnabled={motionActive} />
      <CursorTrail motionEnabled={motionActive} />
      <nav className="site-nav" aria-label="Sections">
        <a className="brand" href="#top">Indra Hembram</a>
        <div className="nav-links"><a href="#about">About</a><a href="#projects">Projects</a><a href="#resume">Resume</a><a href="#achievements">Achievements</a><a href="#math-lab">Math Lab</a><a href="#contact">Contact</a></div>
        <button className="motion-toggle" type="button" aria-pressed={motionActive} title={prefersReducedMotion ? 'Your browser prefers reduced motion; click to override' : 'Toggle animations'} onClick={toggleMotion}>{motionActive ? 'Motion: On' : 'Enable motion'}</button>
      </nav>
      <main>
        <Hero seconds={seconds} base={numberBase} onBaseChange={setNumberBase} motionEnabled={motionActive} />
        <About />
        <Resume />
        <Achievements motionEnabled={motionActive} />
        <Projects />
        <MathLab motionEnabled={motionActive} />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="wrap footer-inner">
          <button className="euler" type="button" aria-label="Toggle golden-ratio grid math mode" onClick={() => setMathMode((active) => !active)}>e<sup>iπ</sup> + 1 = 0</button>
          <span className="footer-hint">{mathMode ? 'Math mode is on · press the equation to switch it off' : 'Built around systems, math, and practical ideas'}</span>
          {isHosted && <button className="site-share" type="button" onClick={copyWebsiteLink}>{shareLabel}</button>}
        </div>
      </footer>
    </div>
  )
}
