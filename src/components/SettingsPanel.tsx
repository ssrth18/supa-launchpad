import { RotateCcw, X } from 'lucide-react'
import type { Settings } from '../types'
import { presets } from '../defaults'
import type { ReactNode } from 'react'

const accents = [
  '#00d9ff','#8b5cf6','#6366f1','#3b82f6','#22d3ee',
  '#14b8a6','#10b981','#f59e0b','#f97316','#ef4444',
  '#ec4899','#d946ef'
]

const Field=({label,children}:{label:string;children:ReactNode})=>(
  <label className="field">
    <span>{label}</span>
    {children}
  </label>
)

export function SettingsPanel({
  settings,onChange,onClose,onApply,onReset
}:{
  settings:Settings
  onChange:(s:Settings)=>void
  onClose:()=>void
  onApply:()=>void
  onReset:()=>void
}){
  const g=settings.grid
  const t=settings.theme

  const setG=(key:keyof typeof g,value:unknown)=>
    onChange({...settings,grid:{...g,[key]:value} as typeof g})

  const setLayout=(value:string)=>{
    const sizes:Record<string,{iconSize:number;tileSize:number;gap:number}>={
      compact:{iconSize:48,tileSize:68,gap:12},
      balanced:{iconSize:56,tileSize:82,gap:18},
      spacious:{iconSize:64,tileSize:94,gap:22}
    }
    const s=sizes[value]
    if(!s)return
    onChange({
      ...settings,
      grid:{
        ...g,
        ...s,
        cols:4,
        rows:8,
        viewMode:'grid',
        scrollDirection:'vertical',
        centerTiles:true
      }
    })
  }

  const currentLayout=g.tileSize<=72?'compact':g.tileSize>=90?'spacious':'balanced'

  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <aside className="settings-panel" role="dialog" aria-modal="true" aria-label="Customize Supa">

      <div className="modal-head">
        <div>
          <span className="eyebrow">Workspace</span>
          <h2>Customize Supa</h2>
        </div>
        <button className="icon-button" onClick={onClose} aria-label="Close">
          <X size={18}/>
        </button>
      </div>

      <section className="settings-section">
        <h3>Launcher</h3>

        <div className="form-grid">
          <Field label="Layout">
            <select value={currentLayout} onChange={e=>setLayout(e.target.value)}>
              <option value="compact">Compact</option>
              <option value="balanced">Balanced</option>
              <option value="spacious">Spacious</option>
            </select>
          </Field>

          <label className="toggle">
            <input
              type="checkbox"
              checked={g.showLabels}
              onChange={e=>setG('showLabels',e.target.checked)}
            />
            <span>Show names</span>
          </label>
        </div>

        <p className="settings-hint">
          Four-column launcher with automatic sizing for every screen.
        </p>
      </section>

      <section className="settings-section">
        <h3>Appearance</h3>

        <div className="form-grid">
          <Field label="Theme">
            <select
              value={t.preset}
              onChange={e=>{
                const p=e.target.value
                if(p in presets){
                  onChange({
                    ...settings,
                    theme:{
                      ...t,
                      preset:p,
                      ...presets[p as keyof typeof presets]
                    }
                  })
                }
              }}
            >
              <option value="cyber">Cyber</option>
              <option value="midnight">Midnight</option>
              <option value="amoled">AMOLED</option>
              <option value="ocean">Ocean</option>
              <option value="forest">Forest</option>
              <option value="sunset">Sunset</option>
              <option value="minimal">Minimal light</option>
              <option value="mono">Monochrome</option>
            </select>
          </Field>

          <Field label="Accent">
            <div className="accent-swatches">
              {accents.map(color=>
                <button
                  key={color}
                  type="button"
                  className={`accent-swatch ${t.accent.toLowerCase()===color?'active':''}`}
                  style={{backgroundColor:color}}
                  aria-label={`Use ${color}`}
                  onClick={()=>onChange({
                    ...settings,
                    theme:{...t,accent:color,preset:'custom'}
                  })}
                />
              )}
            </div>
          </Field>
        </div>
      </section>

      <div className="modal-actions">
        <button className="secondary-button" onClick={onReset}>
          <RotateCcw size={15}/> Reset
        </button>
        <div>
          <button className="secondary-button" onClick={onClose}>Cancel</button>
          <button className="primary-button" onClick={onApply}>Apply changes</button>
        </div>
      </div>
    </aside>
  </div>
}
