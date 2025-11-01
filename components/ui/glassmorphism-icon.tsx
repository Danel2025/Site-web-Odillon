"use client"

import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface GlassmorphismIconProps {
  icon: LucideIcon
  className?: string
  size?: number
  color?: string
}

export function GlassmorphismIcon({ 
  icon: Icon, 
  className, 
  size = 64,
  color = "#1A9B8E" 
}: GlassmorphismIconProps) {
  return (
    <div 
      className={cn(
        "relative rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl group",
        className
      )}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color}95, ${color}80)`,
        border: `2px solid ${color}`,
        boxShadow: `0 8px 32px 0 ${color}50, inset 0 2px 12px 0 rgba(255,255,255,0.3)`
      }}
    >
      {/* Glass shine effect - diagonal highlight */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 40%, rgba(255,255,255,0.15) 100%)'
        }}
      />
      
      {/* Top light reflection */}
      <div 
        className="absolute top-0 left-0 right-0 h-1/3 opacity-40"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)'
        }}
      />
      
      {/* Icon - en blanc pour contraster avec le fond plein */}
      <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon 
          size={size * 0.5} 
          strokeWidth={2.5}
          className="drop-shadow-lg filter"
          style={{ 
            color: 'white',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }}
        />
      </div>
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background: `radial-gradient(circle at center, ${color}, transparent 70%)`
        }}
      />
      
      {/* Bottom shadow for depth */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/4 opacity-30"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)'
        }}
      />
    </div>
  )
}

