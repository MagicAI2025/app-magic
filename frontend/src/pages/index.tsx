import React, { useState } from 'react'
import { Layout } from '@/components/Layout'
import { ProjectGenerator } from '@/components/ProjectGenerator'
import { ProjectList } from '@/components/ProjectList'
import { toast } from 'react-hot-toast'
import { generateProject } from '@/utils/api'
import { useRouter } from 'next/router'

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()
  
  const handleGenerate = async (requirements: string) => {
    try {
      setIsGenerating(true)
      const result = await generateProject(requirements)
      toast.success('Project generated successfully!')
      router.push(`/projects/${result.project.id}`)
    } catch (error) {
      toast.error('Failed to generate project')
    } finally {
      setIsGenerating(false)
    }
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Project Generator */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
            <ProjectGenerator 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </section>
          
          {/* Project List */}
          <section>
            <h2 className="text-2xl font-bold mb-4">My Projects</h2>
            <ProjectList />
          </section>
        </div>
      </div>
    </Layout>
  )
} 