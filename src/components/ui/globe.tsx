"use client"

import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const ORANGE = "#FF642B"
const ROTATION_SPEED = 0.008

const PRIMARY_CITIES = [
  { name: "Shanghai", location: [31.2304, 121.4737] as [number, number] },
  { name: "Taipei", location: [25.033, 121.5654] as [number, number] },
  { name: "Paris", location: [48.8566, 2.3522] as [number, number] },
]

const SECONDARY_CITIES = [
  { name: "Amsterdam", location: [52.3676, 4.9041] as [number, number] },
  { name: "Berlin", location: [52.52, 13.405] as [number, number] },
  { name: "New York", location: [40.7128, -74.006] as [number, number] },
  { name: "Los Angeles", location: [34.0522, -118.2437] as [number, number] },
  { name: "Tokyo", location: [35.6762, 139.6503] as [number, number] },
]

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.97, 0.97, 0.96],
  markerColor: [1, 0.39, 0.17],
  glowColor: [1, 0.39, 0.17],
  markers: [
    ...PRIMARY_CITIES.map((city) => ({ location: city.location, size: 0.1 })),
    ...SECONDARY_CITIES.map((city) => ({ location: city.location, size: 0.06 })),
  ],
}

function degToRad(value: number) {
  return (value * Math.PI) / 180
}

function projectLatLon({
  lat,
  lon,
  phi,
  theta,
  size,
}: {
  lat: number
  lon: number
  phi: number
  theta: number
  size: number
}) {
  const latRad = degToRad(lat)
  // Match COBE's coordinate basis: lon shifted by -PI and X inverted.
  const lonRad = degToRad(lon) - Math.PI

  // Unit sphere coordinates.
  const x0 = -Math.cos(latRad) * Math.cos(lonRad)
  const y0 = Math.sin(latRad)
  const z0 = Math.cos(latRad) * Math.sin(lonRad)

  // Rotate around Y (spin).
  const cosPhi = Math.cos(phi)
  const sinPhi = Math.sin(phi)
  const x1 = x0 * cosPhi + z0 * sinPhi
  const z1 = -x0 * sinPhi + z0 * cosPhi
  const y1 = y0

  // Rotate around X (tilt).
  const cosTheta = Math.cos(theta)
  const sinTheta = Math.sin(theta)
  const y2 = y1 * cosTheta - z1 * sinTheta
  const z2 = y1 * sinTheta + z1 * cosTheta
  const x2 = x1

  const radius = (size / 2) * 0.8
  const screenX = size / 2 + x2 * radius
  const screenY = size / 2 - y2 * radius
  const visible = z2 > 0

  return { screenX, screenY, visible }
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0)

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      setR(delta / 200)
    }
  }

  const onRender = useCallback(
    (state: Record<string, number>) => {
      if (pointerInteracting.current === null) phi += ROTATION_SPEED
      const renderPhi = phi + r
      state.phi = renderPhi
      state.width = width * 2
      state.height = width * 2

      const size = width
      if (!size) return

      const theta = typeof config.theta === "number" ? config.theta : 0.3
      const positions: Record<string, { x: number; y: number; visible: boolean }> = {}
      for (const city of PRIMARY_CITIES) {
        const [lat, lon] = city.location
        const projected = projectLatLon({
          lat,
          lon,
          phi: renderPhi,
          theta,
          size,
        })
        positions[city.name] = {
          x: projected.screenX,
          y: projected.screenY,
          visible: projected.visible,
        }
      }

      // Simple collision avoidance: push Shanghai/Taipei apart if too close.
      const sh = positions["Shanghai"]
      const tp = positions["Taipei"]
      let shOffsetX = 0
      let tpOffsetX = 0
      if (sh && tp && sh.visible && tp.visible) {
        const dx = sh.x - tp.x
        const dy = sh.y - tp.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const minDist = 34
        if (dist < minDist) {
          const push = (minDist - dist) / 2
          const dir = dx >= 0 ? 1 : -1
          shOffsetX += push * dir
          tpOffsetX -= push * dir
        }
      }

      for (const city of PRIMARY_CITIES) {
        const el = labelRefs.current[city.name]
        if (!el) continue

        const pos = positions[city.name]
        if (!pos || !pos.visible) {
          el.style.opacity = "0"
          continue
        }

        let x = pos.x
        if (city.name === "Shanghai") x += shOffsetX
        if (city.name === "Taipei") x += tpOffsetX

        el.style.opacity = "1"
        el.style.transform = `translate(${x}px, ${pos.y}px) translate(-50%, -130%)`
      }
    },
    [config.theta, r],
  )

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    })

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1"
    })
    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[460px]",
        className,
      )}
    >
      <canvas
        className="size-full opacity-0 transition-opacity duration-700 [contain:layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />

      {/* Square name pins for deep-story cities (DOM overlay) */}
      <div className="pointer-events-none absolute inset-0">
        {PRIMARY_CITIES.map((city) => (
          <div
            key={city.name}
            ref={(node) => {
              labelRefs.current[city.name] = node
            }}
            className="absolute left-0 top-0 whitespace-nowrap border border-[#FF642B] bg-stone-950/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FF642B] opacity-0"
            style={{
              borderRadius: 0,
              boxShadow: `0 0 0 1px ${ORANGE}33`,
            }}
          >
            {city.name}
          </div>
        ))}
      </div>
    </div>
  )
}
