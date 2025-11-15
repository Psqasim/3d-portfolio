"use client"

import React, { useEffect, useState } from "react"

type ThemeMode = "light" | "dark" | "system"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system")

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement
    let shouldBeDark = false

    if (mode === "system") {
      shouldBeDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    } else {
      shouldBeDark = mode === "dark"
    }

    console.log("[v0] Applying theme:", mode, "isDark:", shouldBeDark)
    setIsDark(shouldBeDark)
    if (shouldBeDark) {
      root.classList.add("dark")
      root.style.colorScheme = "dark"
    } else {
      root.classList.remove("dark")
      root.style.colorScheme = "light"
    }
    localStorage.setItem("theme", mode)
  }

  useEffect(() => {
    setIsMounted(true)
    const storedTheme = (localStorage.getItem("theme") as ThemeMode | null) || "system"
    setThemeModeState(storedTheme)
    applyTheme(storedTheme)
  }, [])

  useEffect(() => {
    if (isMounted) {
      applyTheme(themeMode)
    }
  }, [themeMode, isMounted])

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode)
  }

  const toggleTheme = () => {
    const modes: ThemeMode[] = ["light", "dark", "system"]
    const currentIndex = modes.indexOf(themeMode)
    const nextMode = modes[(currentIndex + 1) % modes.length]
    setThemeMode(nextMode)
  }

  if (!isMounted) return <>{children}</>

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const ThemeContext = React.createContext<{
  isDark: boolean
  toggleTheme: () => void
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
}>({ isDark: false, toggleTheme: () => {}, themeMode: "system", setThemeMode: () => {} })

export function useTheme() {
  return React.useContext(ThemeContext)
}
