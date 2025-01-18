"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Activity, BarChart, Search, Target, PlayCircle } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="space-y-12 px-4 sm:px-8 lg:px-16">
      {/* Welcome Header */}
      <header className="text-center mt-12">
        <h1 className="text-5xl font-extrabold text-primary">Welcome to CipherHaven</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Your trusted platform for CryptoGraphic Vulnerability Analysis, Visualization, and Secure Testing.
        </p>
      </header>

      {/* Website Overview Section */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-primary">Explore Our Features</h2>
        <p className="mt-4 text-xl text-muted-foreground">
          CipherHaven provides a range of tools to analyze, visualize, and secure your cryptographic systems.
        </p>
      </section>

      {/* Features Cards Section */}
      <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Crypto Visualizer */}
        <Card className="bg-blue-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Crypto Visualizer</CardTitle>
            <BarChart className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">
              Visualize complex cryptographic algorithms and systems in action.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Explore interactive visualizations for encryption, hashing, and more.
            </p>
          </CardContent>
        </Card>

        {/* Vulnerability Scanner */}
        <Card className="bg-green-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vulnerability Scanner</CardTitle>
            <Search className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">
              Scan your cryptographic systems for vulnerabilities in real-time.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Identify weaknesses and secure your systems with automated vulnerability checks.
            </p>
          </CardContent>
        </Card>

        {/* Attack Lab */}
        <Card className="bg-yellow-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attack Lab</CardTitle>
            <Target className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">
              Test your systems under simulated cryptographic attacks.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Experiment and learn how different attacks affect cryptographic protocols.
            </p>
          </CardContent>
        </Card>

        {/* Games */}
        <Card className="bg-purple-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Games</CardTitle>
            <PlayCircle className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">
              Engage with educational games designed to sharpen your cryptographic skills.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Learn through interactive challenges while having fun.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-primary">Get Started Now</h2>
        <p className="mt-4 text-xl text-muted-foreground">Join CipherHaven and explore the world of cryptographic security through our advanced tools and games.</p>
        <button className="mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark">
          Explore CipherHaven
        </button>
      </section>
    </div>
  );
}
