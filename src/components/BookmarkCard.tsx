import { useEffect, useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import type { Bookmark } from '../types'

function favicon(bookmark:Bookmark){
  if(bookmark.icon_url?.trim()) return bookmark.icon_url.trim()
  try{return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(new URL(bookmark.url).hostname)}&sz=128`}catch{return ''}
}

export function BookmarkCard({bookmark,onEdit}:{bookmark:Bookmark;onEdit:(b:Bookmark)=>void}){
  const src=favicon(bookmark)
  const initial=(bookmark.name?.trim()[0]||'•').toUpperCase()
  const timer=useRef<number|undefined>()
  const longPressed=useRef(false)

  const clearTimer=()=>{
    if(timer.current!==undefined){
      window.clearTimeout(timer.current)
      timer.current=undefined
    }
  }

  useEffect(()=>clearTimer,[])

  const startPress=()=>{
    longPressed.current=false
    clearTimer()
    timer.current=window.setTimeout(()=>{
      longPressed.current=true
      navigator.vibrate?.(25)
      onEdit(bookmark)
    },500)
  }

  const endPress=()=>clearTimer()

  const openBookmark=()=>{
    if(longPressed.current){
      longPressed.current=false
      return
    }
    window.open(bookmark.url,'_blank','noopener,noreferrer')
  }

  return <article className="bookmark-card" onContextMenu={e=>{e.preventDefault();onEdit(bookmark)}}>
    <button
      className="bookmark-main"
      onPointerDown={startPress}
      onPointerUp={endPress}
      onPointerCancel={endPress}
      onClick={openBookmark}
      aria-label={`Open ${bookmark.name}`}
    >
      <div className="bookmark-icon-wrap">
        {src?<img src={src} alt="" referrerPolicy="no-referrer" onError={e=>{e.currentTarget.style.display='none'}}/>:null}
        <span className="fallback-letter">{bookmark.emoji||initial}</span>
      </div>
      <div className="bookmark-copy">
        <strong>{bookmark.name}</strong>
        <span>{(()=>{try{return new URL(bookmark.url).hostname.replace('www.','')}catch{return bookmark.url}})()}</span>
      </div>
      <ExternalLink size={15} className="open-indicator"/>
    </button>
  </article>
}
