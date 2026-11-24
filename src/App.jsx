import { useEffect, useRef, useState } from 'react'
import './styles.css'

const asset = (name) => `${import.meta.env.BASE_URL}${name}`
const BIRTH_DATE = new Date('2004-11-11T00:20:18+05:30')
const GITHUB_URL = 'https://github.com/indra4626'
const LINKEDIN_URL = 'https://www.linkedin.com/in/indra-hembram-ece'
const EMAIL = 'hembramindra1@gmail.com'

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

const RING_PATH = Array.from({ length: 361 }, (_, index) => {
  const angle = index * Math.PI / 180
  const radius = 112 + 6 * Math.sin(12 * angle)
  const command = index === 0 ? 'M' : 'L'
  return `${command}${(120 + radius * Math.cos(angle)).toFixed(1)} ${(120 + radius * Math.sin(angle)).toFixed(1)}`
}).join(' ')

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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
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

function FibonacciCanvas({ motionEnabled }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21]
    const squares = [{ x: 0, y: 0, size: fibonacci[0] }]
    const bounds = { left: 0, right: 1, bottom: 0, top: 1 }
    let width = 0
    let height = 0
    let frame = 0
    let startTime = null
    let finished = false

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

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.max(1, Math.round(width * ratio))
      canvas.height = Math.max(1, Math.round(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      if (finished) draw(performance.now())
    }

    const draw = (time) => {
      if (startTime === null) startTime = time
      const progress = !motionEnabled
        ? 1
        : Math.min((time - startTime) / 5200, 1)
      context.clearRect(0, 0, width, height)
      const scale = Math.min(width / (bounds.right - bounds.left), height / (bounds.top - bounds.bottom)) * 0.86
      const gridWidth = (bounds.right - bounds.left) * scale
      const gridHeight = (bounds.top - bounds.bottom) * scale
      const offsetX = (width - gridWidth) / 2
      const offsetY = (height - gridHeight) / 2
      const visibleSquares = Math.ceil(progress * squares.length)
      context.strokeStyle = 'rgba(200, 162, 74, 0.3)'
      context.lineWidth = 0.8
      for (let index = 0; index < visibleSquares; index += 1) {
        const square = squares[index]
        const squareX = offsetX + (square.x - bounds.left) * scale
        const squareY = offsetY + (bounds.top - square.y - square.size) * scale
        context.strokeRect(squareX, squareY, square.size * scale, square.size * scale)
      }
      const maxAngle = Math.PI * 4 * progress
      const finalRadius = Math.min(width, height) * 0.42
      const startRadius = finalRadius / Math.pow((1 + Math.sqrt(5)) / 2, 8)
      const growth = 2 * Math.log((1 + Math.sqrt(5)) / 2) / Math.PI
      const centerX = width / 2
      const centerY = height / 2
      context.beginPath()
      for (let angle = 0; angle <= maxAngle; angle += 0.02) {
        const radius = startRadius * Math.exp(angle * growth)
        const x = centerX + radius * Math.cos(angle + Math.PI)
        const y = centerY + radius * Math.sin(angle + Math.PI)
        if (angle === 0) context.moveTo(x, y)
        else context.lineTo(x, y)
      }
      context.strokeStyle = '#C8A24A'
      context.lineWidth = 1.7
      context.stroke()
      if (maxAngle > 0) {
        const radius = startRadius * Math.exp(maxAngle * growth)
        context.beginPath()
        context.arc(centerX + radius * Math.cos(maxAngle + Math.PI), centerY + radius * Math.sin(maxAngle + Math.PI), 2.5, 0, Math.PI * 2)
        context.fillStyle = '#E8C46A'
        context.fill()
      }
      finished = progress === 1
      if (!finished) frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [motionEnabled])

  return <canvas ref={canvasRef} id="sp" role="img" aria-label="Animated golden spiral over geometric squares" />
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
          <div className="portrait">
            <svg className="ring" viewBox="0 0 240 240" aria-hidden="true"><path d={RING_PATH} /></svg>
            <img src={asset('profile.webp')} alt="Portrait of Indra Hembram" width="170" height="170" />
            <span className="equation equation-one">e<sup>iπ</sup> + 1 = 0</span>
            <span className="equation equation-two">φ = (1 + √5) / 2</span>
            <span className="equation equation-three">V = IR</span>
            <span className="equation equation-four">F(ω) = ∫ f(t)e<sup>−iωt</sup>dt</span>
          </div>
          <h1>Indra Hembram</h1>
          <p className="hero-subtitle">Electronics and Communication Engineer. I look for the equation under every system.</p>
          <AgeCounter seconds={seconds} base={base} onBaseChange={onBaseChange} />
        </div>
        <FibonacciCanvas motionEnabled={motionEnabled} />
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
  return (
    <section id="resume">
      <div className="wrap">
        <p className="eyebrow">Background</p>
        <h2>Resume, as a proof</h2>
        <dl className="proof">
          <dt>Professional summary</dt>
          <dd>Electronics and Communication Engineering student with experience in leadership, community engagement, technical projects, and large-scale student coordination. Strengths include communication, teamwork, event management, and problem-solving.</dd>
          <dt>Education</dt>
          <dd>B.Tech in Electronics and Communication Engineering, Kalyani Government Engineering College, Jul 2022–Jul 2026, CGPA 6.8. Higher Secondary at Dhaniakhali Mahamaya Vidyamandir, Mar 2020–Jun 2022, 87.4%.</dd>
          <dt>Training</dt>
          <dd>Airports Authority of India, CNS Department, Kolkata (Jul 2025, certificate); Damodar Valley Corporation, Power Systems, Howrah (Jul–Aug 2025, certificate).</dd>
          <dt>Leadership</dt>
          <dd>NSS volunteer at KGEC (2024); General Secretary and Organizing Lead of SESWA (Nov 2024–present); Convener of Chitrank, KGEC Art Club (2025–present).</dd>
        </dl>
        <ol className="timeline" aria-label="Education and experience timeline">
          <li>Jul 2022: B.Tech begins at KGEC</li>
          <li>2024: NSS volunteer</li>
          <li>Nov 2024: SESWA General Secretary</li>
          <li>2025: AAI and DVC training; Chitrank Convener</li>
          <li>2025–2026: Solar detector, Gulu AI, SESWA platform</li>
          <li>Jul 2026: B.Tech program end date</li>
        </ol>
        <div className="resume-actions no-print">
          <button className="btn" type="button" onClick={() => window.print()}>Print live resume</button>
          <a className="btn" href={asset('resume.pdf')} download="Indra-Hembram-Resume.pdf">Download resume PDF</a>
        </div>
        <article className="resume-sheet" aria-label="Resume of Indra Hembram">
          <h3>INDRA HEMBRAM</h3>
          <p className="resume-contact">Kalyani, West Bengal, India | +91-9382091267 | <a href={`mailto:${EMAIL}`}>{EMAIL}</a> | <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a> | <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a></p>
          <h4>Professional Summary</h4>
          <p>Electronics and Communication Engineering student with experience in leadership, community engagement, technical projects, and large-scale student coordination. Skilled in communication, teamwork, event management, and problem-solving through NSS initiatives, organizational responsibilities, and project-based learning. Seeking a government or core engineering role.</p>
          <h4>Education</h4>
          <p><b>Kalyani Government Engineering College</b>, B.Tech in Electronics and Communication Engineering, Jul 2022–Jul 2026, CGPA 6.8, Kalyani, West Bengal.<br /><b>Dhaniakhali Mahamaya Vidyamandir</b>, Higher Secondary Education, Mar 2020–Jun 2022, 87.4%, Hooghly, West Bengal.</p>
          <h4>Training and Experience</h4>
          <ul>
            <li><b>Airports Authority of India (AAI)</b>, CNS Department Internship, Kolkata (Jul 2025, Certificate). Learned operational concepts of Communication, Navigation, and Surveillance systems used in aviation; observed aircraft communication workflow, ATC coordination, and airport operational monitoring.</li>
            <li><b>Damodar Valley Corporation (DVC)</b>, Industrial Training, Howrah (Jul–Aug 2025, Certificate). Learned SCADA concepts, communication flow, and monitoring systems used in power-grid operations; observed coordination and technical supervision in industrial environments.</li>
          </ul>
          <h4>Community and Leadership</h4>
          <ul>
            <li><b>National Service Scheme (NSS), KGEC</b>, Volunteer (2024). Participated in a 7-Day Special Camp focused on community engagement and local development, and in the YUVA SAMVAD: INDIA@2047 youth dialogue initiative.</li>
            <li><b>SESWA</b>, General Secretary and Organizing Lead (Nov 2024–present). Coordinated student and alumni engagement and led the SESWA Freshers’ Welcome and Annual Cultural Program 2026, with 350+ participants and 50+ alumni.</li>
            <li><b>Chitrank, KGEC Art Club</b>, Convener (2025–present). Led a creative team of 70+ members during the annual ESPECKTRO fest.</li>
          </ul>
          <h4>Projects</h4>
          <ul>
            <li><b>SESWA Registration and Event Management System</b>, React.js and Firebase (2026). Live event platform used by 350+ participants across multiple engineering colleges.</li>
            <li><b>Solar Powered Air Pollution Detector</b>, Arduino Uno, MQ135 gas sensor, and solar panel (2025). Low-cost solar-powered air-quality monitor for environmental awareness.</li>
            <li><b>Gulu AI Assistant</b>, browser-based conversational assistant interface (2025).</li>
            <li><b>TRIAC AC Fan Speed Controller</b>, phase-control circuit and firmware (2026).</li>
          </ul>
          <h4>Skills and Languages</h4>
          <p>Communication, leadership, team coordination, event management, Arduino, Python, C, MATLAB, Cisco Packet Tracer, React.js, Firebase, MS Office, Git, GitHub, VS Code. Languages: Bengali, English, Hindi, Santali.</p>
        </article>
      </div>
    </section>
  )
}

function AchievementCard({ value, suffix, label }) {
  const [ref, visible] = useReveal()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) return undefined
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
  }, [value, visible])

  const number = Number.isInteger(value) ? Math.round(count) : count.toFixed(1)
  return <article ref={ref} className="achievement"><strong>{number}{suffix}</strong><p>{label}</p></article>
}

function Achievements() {
  return (
    <section id="achievements">
      <div className="wrap">
        <p className="eyebrow">Milestones</p>
        <h2>Achievements</h2>
        <p className="lead">Numbers from my experience so far.</p>
        <div className="achievement-grid">
          <AchievementCard value={350} suffix="+" label="participants at SESWA’s Freshers’ Welcome and Annual Cultural Program, with 50+ alumni" />
          <AchievementCard value={70} suffix="+" label="members led as Convener of Chitrank for the ESPECKTRO fest" />
          <AchievementCard value={3} suffix="" label="industrial and technical trainings: AAI, DVC, and Victoria Industries" />
          <AchievementCard value={87.4} suffix="%" label="in Higher Secondary Education" />
        </div>
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
  const [sectionRef, sectionVisible] = useReveal()

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
    const start = performance.now()
    const reduceMotion = !motionEnabled

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.max(1, Math.round(width * ratio))
      canvas.height = Math.max(1, Math.round(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const draw = (time) => {
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
      } else {
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
      if (!reduceMotion || mode === 'fft') frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [angle, frequencies, mode, motionEnabled])

  const updateFrequency = (index, value) => setFrequencies((current) => current.map((frequency, currentIndex) => currentIndex === index ? Number(value) : frequency))

  return (
    <section id="math-lab">
      <div className="wrap">
        <p className="eyebrow">Explore</p><h2>Math Lab</h2>
        <p className="lead">Signals and their spectrum, or the angle nature uses to pack seeds.</p>
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
    const points = []
    let frame = 0
    let width = 0
    let height = 0
    const resize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight }
    const move = (event) => { points.push([event.clientX, event.clientY, performance.now()]) }
    const draw = (now) => {
      context.clearRect(0, 0, width, height)
      while (points.length && now - points[0][2] > 650) points.shift()
      for (let index = 1; index < points.length; index += 1) {
        context.strokeStyle = `rgba(200,162,74,${Math.max(0, 1 - (now - points[index][2]) / 650)})`
        context.lineWidth = 1.3; context.beginPath(); context.moveTo(points[index - 1][0], points[index - 1][1]); context.lineTo(points[index][0], points[index][1]); context.stroke()
      }
      frame = requestAnimationFrame(draw)
    }
    resize(); window.addEventListener('resize', resize); window.addEventListener('pointermove', move); frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move) }
  }, [motionEnabled])

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />
}

export default function App() {
  const [mathMode, setMathMode] = useState(false)
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
  const seconds = Math.max(0, Math.floor((now - BIRTH_DATE.getTime()) / 1000))

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const copyWebsiteLink = async () => {
    const url = new URL(import.meta.env.BASE_URL, window.location.origin).href
    try {
      await navigator.clipboard.writeText(url)
      setShareLabel('Website link copied')
    } catch {
      window.prompt('Copy website link', url)
    }
  }

  const toggleMotion = () => setMotionEnabled((enabled) => {
    const nextEnabled = !enabled
    try {
      window.localStorage.setItem('indra-portfolio-motion', String(nextEnabled))
    } catch {}
    return nextEnabled
  })

  return (
    <div className={`app ${mathMode ? 'math-mode' : ''} ${motionEnabled ? 'motion-enabled' : ''}`}>
      <CursorTrail motionEnabled={motionEnabled} />
      <nav className="site-nav" aria-label="Sections">
        <a className="brand" href="#top">Indra Hembram</a>
        <div className="nav-links"><a href="#about">About</a><a href="#projects">Projects</a><a href="#resume">Resume</a><a href="#achievements">Achievements</a><a href="#math-lab">Math Lab</a><a href="#contact">Contact</a></div>
        <button className="motion-toggle" type="button" aria-pressed={motionEnabled} onClick={toggleMotion}>{motionEnabled ? 'Motion: On' : 'Enable motion'}</button>
      </nav>
      <main>
        <Hero seconds={seconds} base={numberBase} onBaseChange={setNumberBase} motionEnabled={motionEnabled} />
        <About />
        <Resume />
        <Achievements />
        <Projects />
        <MathLab motionEnabled={motionEnabled} />
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
