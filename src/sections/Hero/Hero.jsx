import React from 'react'
import Button from '../../components/ui/Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Welcome to <span className="text-purple-400">ClauseAI</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 leading-8">
            Your ultimate solution for legal document automation.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
            <Button variant="secondary" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}