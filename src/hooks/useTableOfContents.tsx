import { useState, useMemo, useEffect } from 'react'

type TocItem = {
  id: string
  title: string
  depth: number
}

export default function useTableOfContents(markdownContent: string) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const toc = useMemo(() => {
    // 코드 블록을 제외한 헤더만 찾기
    const lines = markdownContent.split('\n')
    const headers: TocItem[] = []
    let isInCodeBlock = false

    lines.forEach(line => {
      // 코드 블록 시작/끝 체크
      if (line.trim().startsWith('```')) {
        isInCodeBlock = !isInCodeBlock
        return
      }

      // 코드 블록 내부면 무시
      if (isInCodeBlock) return

      // 헤더 매칭
      const headerMatch = line.match(/^(#{1,3})\s+(.+)$/)
      if (headerMatch) {
        const depth = headerMatch[1].length - 1
        const title = headerMatch[2].trim()
        const id = `${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}_`
        headers.push({ id, title, depth })
      }
    })

    if (headers.length > 0) {
      const minDepth = Math.min(...headers.map(h => h.depth))
      return headers.map(h => ({
        ...h,
        depth: h.depth - minDepth,
      }))
    }

    return headers
  }, [markdownContent])

  useEffect(() => {
    const callback: IntersectionObserverCallback = entries => {
      const visibleEntries = entries.filter(
        entry => entry.isIntersecting && entry.intersectionRatio > 0,
      )

      if (visibleEntries.length > 0) {
        const targetEntry = visibleEntries.reduce((acc, cur) => {
          const accTop = Math.abs(acc.boundingClientRect.top)
          const curTop = Math.abs(cur.boundingClientRect.top)
          return accTop < curTop ? acc : cur
        })

        setActiveId(targetEntry.target.id)
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-10% 0px -20% 0px',
      threshold: [0, 0.5, 1],
    })

    const headerElements = document.querySelectorAll(
      '#content h1, #content h2, #content h3',
    )
    headerElements.forEach(element => observer.observe(element))

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      const headerElements = Array.from(
        document.querySelectorAll('#content h1, #content h2, #content h3'),
      )

      const visibleHeader = headerElements.find(element => {
        const rect = element.getBoundingClientRect()
        return rect.top >= 0 && rect.top <= window.innerHeight * 0.3
      })

      if (visibleHeader) {
        setActiveId(visibleHeader.id)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [toc])

  return { toc, activeId }
}
