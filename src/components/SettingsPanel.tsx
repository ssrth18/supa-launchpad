import { RotateCcw, X } from 'lucide-react'
import type { Settings } from '../types'
import { presets } from '../defaults'
import type { ReactNode } from 'react'

const accentPresets = [
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Sky', value: '#0ea5e9' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Lime', value: '#84cc16' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Fuchsia', value: '#d946ef' },
]

const Field = ({
  label,
  children,
  full = false,
}: {
  label: string
  children: ReactNode
  full?: boolean
}) => (
  <label className={`field ${full ? 'full' : ''}`}>
    <span>{label}</span>
    {children}
  </label>
)

export function SettingsPanel({
  settings,
  onChange,
  onClose,
  onApply,
  onReset,
}: {
  settings: Settings
  onChange: (s: Settings) => void
  onClose: () => void
  onApply: () => void
  onReset: () => void
}) {
  const g = settings.grid
  const t = settings.theme

  const setG = (key: keyof typeof g, value: unknown) =>
    onChange({
      ...settings,
      grid: {
        ...g,
        [key]: value,
      } as typeof g,
    })

  const setT = (key: keyof typeof t, value: unknown) =>
    onChange({
      ...settings,
      theme: {
        ...t,
        [key]: value,
      } as typeof t,
    })

  return (
    <div
      className="modal-backdrop"
      onMouseDown={e => e.target === e.currentTarget && onClose()}
    >
      <aside
        className="settings-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Customize Supa"
      >
        <div className="modal-head">
          <div>
            <span className="eyebrow">Workspace</span>
            <h2>Customize Supa</h2>
          </div>

          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close settings"
          >
            <X size={18} />
          </button>
        </div>

        <section className="settings-section">
          <h3>Layout</h3>

          <div className="form-grid">
            <Field label="View">
              <select
                value={g.viewMode}
                onChange={e => setG('viewMode', e.target.value)}
              >
                <option value="grid">Grid</option>
                <option value="row">Row</option>
                <option value="tile">Tile</option>
              </select>
            </Field>

            <Field label="Scroll">
              <select
                value={g.scrollDirection}
                onChange={e => setG('scrollDirection', e.target.value)}
              >
                <option value="vertical">Vertical</option>
                <option value="horizontal">Horizontal</option>
              </select>
            </Field>

            <Field label="Rows">
              <input
                type="number"
                min="1"
                max="12"
                value={g.rows}
                onChange={e => setG('rows', Number(e.target.value))}
              />
            </Field>

            <Field label="Columns">
              <input
                type="number"
                min="1"
                max="12"
                value={g.cols}
                onChange={e => setG('cols', Number(e.target.value))}
              />
            </Field>

            <Field label={`Icon size · ${g.iconSize}px`}>
              <input
                type="range"
                min="28"
                max="86"
                value={g.iconSize}
                onChange={e => setG('iconSize', Number(e.target.value))}
              />
            </Field>

            <Field label={`Card size · ${g.tileSize}px`}>
              <input
                type="range"
                min="70"
                max="150"
                value={g.tileSize}
                onChange={e => setG('tileSize', Number(e.target.value))}
              />
            </Field>

            <Field label={`Spacing · ${g.gap}px`}>
              <input
                type="range"
                min="6"
                max="42"
                value={g.gap}
                onChange={e => setG('gap', Number(e.target.value))}
              />
            </Field>

            <Field label={`Radius · ${g.radius}px`}>
              <input
                type="range"
                min="0"
                max="40"
                value={g.radius}
                onChange={e => setG('radius', Number(e.target.value))}
              />
            </Field>

            <Field label="Typeface">
              <select
                value={g.font}
                onChange={e => setG('font', e.target.value)}
              >
                <option value={g.font}>Inter / system</option>
                <option value="Arial,sans-serif">Arial</option>
                <option value="Verdana,sans-serif">Verdana</option>
                <option value="Georgia,serif">Georgia</option>
                <option value="monospace">Monospace</option>
              </select>
            </Field>

            <Field label={`Label size · ${g.labelSize}px`}>
              <input
                type="range"
                min="9"
                max="18"
                value={g.labelSize}
                onChange={e => setG('labelSize', Number(e.target.value))}
              />
            </Field>

            <label className="toggle">
              <input
                type="checkbox"
                checked={g.showLabels}
                onChange={e => setG('showLabels', e.target.checked)}
              />
              <span>Show names</span>
            </label>

            <label className="toggle">
              <input
                type="checkbox"
                checked={g.centerTiles}
                onChange={e => setG('centerTiles', e.target.checked)}
              />
              <span>Center grid</span>
            </label>
          </div>
        </section>

        <section className="settings-section">
          <h3>Appearance</h3>

          <div className="form-grid">
            <Field label="Mode">
              <select
                value={t.mode}
                onChange={e => setT('mode', e.target.value)}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </Field>

            <Field label="Preset">
              <select
                value={t.preset}
                onChange={e => {
                  const p = e.target.value

                  if (p !== 'custom' && p in presets) {
                    onChange({
                      ...settings,
                      theme: {
                        ...t,
                        preset: p,
                        ...presets[p as keyof typeof presets],
                      },
                    })
                  } else {
                    setT('preset', p)
                  }
                }}
              >
                <option value="midnight">Midnight</option>
                <option value="amoled">AMOLED</option>
                <option value="ocean">Ocean</option>
                <option value="forest">Forest</option>
                <option value="sunset">Sunset</option>
                <option value="cyber">Cyber</option>
                <option value="minimal">Minimal light</option>
                <option value="mono">Monochrome</option>
                <option value="custom">Custom</option>
              </select>
            </Field>

            <Field label="Accent">
              <div className="accent-control">
                <div className="accent-swatches" role="listbox" aria-label="Accent color">
                  {accentPresets.map(accent => (
                    <button
                      key={accent.value}
                      type="button"
                      className={`accent-swatch ${
                        t.accent.toLowerCase() === accent.value
                          ? 'active'
                          : ''
                      }`}
                      style={{ backgroundColor: accent.value }}
                      title={accent.name}
                      aria-label={`Use ${accent.name} accent`}
                      aria-selected={
                        t.accent.toLowerCase() === accent.value
                      }
                      onClick={() => {
                        onChange({
                          ...settings,
                          theme: {
                            ...t,
                            accent: accent.value,
                            preset: 'custom',
                          },
                        })
                      }}
                    />
                  ))}
                </div>

                <div className="custom-accent">
                  <input
                    type="color"
                    value={t.accent}
                    onChange={e => {
                      onChange({
                        ...settings,
                        theme: {
                          ...t,
                          accent: e.target.value,
                          preset: 'custom',
                        },
                      })
                    }}
                    aria-label="Custom accent color"
                  />

                  <span>{t.accent.toUpperCase()}</span>
                </div>
              </div>
            </Field>

            <Field label="Panel">
              <input
                type="color"
                value={t.panel}
                onChange={e => setT('panel', e.target.value)}
              />
            </Field>

            <Field label="Background">
              <input
                type="color"
                value={t.bg}
                onChange={e => setT('bg', e.target.value)}
              />
            </Field>

            <Field label="Border">
              <input
                type="color"
                value={t.border}
                onChange={e => setT('border', e.target.value)}
              />
            </Field>

            <Field label="Background image" full>
              <input
                value={t.bgImage}
                onChange={e => setT('bgImage', e.target.value)}
                placeholder="https://..."
              />
            </Field>
          </div>
        </section>

        <div className="modal-actions">
          <button className="secondary-button" onClick={onReset}>
            <RotateCcw size={15} />
            Reset
          </button>

          <div>
            <button className="secondary-button" onClick={onClose}>
              Cancel
            </button>

            <button className="primary-button" onClick={onApply}>
              Apply changes
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
  }
