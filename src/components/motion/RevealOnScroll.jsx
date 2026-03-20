import { useEffect, useRef, useState } from 'react'

function RevealOnScroll({ children, delay = 0, className = '', as = 'div' }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Observe the wrapper once and permanently reveal it the first time
    // it enters the viewport.
    const element = ref.current
    if (!element || isVisible) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [isVisible])

  // Allow callers to choose the rendered element while consistently
  // applying the reveal animation classes and delay token.
  const Component = as
  const joinedClassName = `reveal${isVisible ? ' revealed' : ''}${className ? ` ${className}` : ''}`

  return (
    <Component ref={ref} className={joinedClassName} style={{ '--reveal-delay': `${delay}ms` }}>
      {children}
    </Component>
  )
}

export default RevealOnScroll
