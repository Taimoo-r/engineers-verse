import React, {useState, useEffect} from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Linkedin, ExternalLink, Mail, FileText, UserPlus, Users, Heart, Trash2 } from "lucide-react"
import Loader from './Loader'
import { useUserContext } from '@/userContext'
import { useParams } from 'react-router-dom'

export default function Component() {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const { userId } = useParams(); // Get the userId from the URL
    const [posts, setPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    
    
    

  const Data = {
    name: "Jane Doe",
    username: "@janedoe",
    location: "San Francisco, CA",
    title: "Software Engineer",
    profilePicture: "/placeholder.svg",
    resume: "/jane-doe-resume.pdf",
    skills: [
      { name: "Python", proficiency: 90 },
      { name: "JavaScript", proficiency: 85 },
      { name: "React", proficiency: 80 },
      { name: "Node.js", proficiency: 75 },
      { name: "AWS", proficiency: 70 },
      { name: "Docker", proficiency: 65 },
    ],
    projects: [
      { title: "AI Chatbot", description: "Developed an AI-powered chatbot using NLP techniques", link: "https://github.com/janedoe/ai-chatbot" },
      { title: "IoT Home Automation", description: "Created a smart home system with Arduino and Raspberry Pi", link: "https://github.com/janedoe/iot-home" },
    ],
    experience: [
      { title: "Senior Software Engineer", company: "Tech Corp", year: "2020 - Present" },
      { title: "Software Engineer", company: "Startup Inc", year: "2018 - 2020" },
      { title: "B.S. Computer Science", company: "University of Technology", year: "2014 - 2018" },
    ],
    email: "jane.doe@example.com",
    portfolioLinks: {
      github: "https://github.com/janedoe",
      linkedin: "https://linkedin.com/in/janedoe",
      website: "https://janedoe.com",
    },
    posts: [
      { id: 1, type: 'image', content: '/placeholder.svg', description: 'Working on a new AI project!', likes: 42, comments: 2 },
      { id: 2, type: 'video', content: '/placeholder-video.mp4', description: 'Quick demo of my latest IoT setup', likes: 38, comments: 1 },
    ],
    followers: 1234,
    following: 567,
    connections: 890,
  }
  
  const fetchCurrentUser = async () => {
    try {
      // Make a GET request to the backend route to fetch the current user
      
      setLoading(true)
      const response = await fetch(`https://engineers-verse-back.vercel.app/api/v1/users/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the response is okay (status 200-299)
      if (!response.ok) {
        throw new Error('Failed to fetch current user');
      }
  
      // Parse the JSON response
      const user = await response.json();
      console.log("User : ", user) 
      setUserData(user);
      console.log("User Data : ", userData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching current user:', error);
      setLoading(false)
      throw error; // Rethrow error so it can be handled elsewhere if needed
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [userId]); 

  const fetchPosts = async() => {
    try{
        console.log("atFetchPosts")
      const token = localStorage.getItem('accessToken') // assuming token is store
      const response = await fetch(`https://engineers-verse-back.vercel.app/api/v1/post/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // Include JWT token for authentication
          'Content-Type': 'application/json'  // Optional, but helps ensure the correct content type
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Posts created by user:', response)
        setPosts(data)
      } else {
        console.error('Failed to fetch posts for the user:', response.status)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } 
  }

  if(loading)
    return <Loader/>
  return (
    <div className="container mx-auto p-4 space-y-8 bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={userData.avatar} alt={userData.fullName} />
              <AvatarFallback>{userData?.fullName?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-grow items-center space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold">{userData.fullName}</h1>
              <p className="text-xl text-muted-foreground">{userData.title}</p>
              <p className="text-sm text-muted-foreground">{userData.location}</p>
              <p className="text-sm text-muted-foreground">{userData.username}</p>
            </div>
            <div className="md:ml-auto space-y-2">
              <Button variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Follow
              </Button>
              <div className="flex space-x-4 mt-2">
                <div className="text-center">
                  <p className="font-bold">{userData?.followers?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">{userData?.following?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">{0}</p>
                  <p className="text-sm text-muted-foreground">Connections</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Resume View Section */}
          <Card>
            <CardHeader>
              <CardTitle>Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={() => window.open(userData.resume, '_blank')}>
                <FileText className="mr-2 h-4 w-4" />
                {!userData.resume ? "No Resume Yet" : "View Resume"}
              </Button>
            </CardContent>
          </Card>

          {/* Skills Section */}
         <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Data?.skills?.map((skill, index) => (
                    <div key={index} className="bg-secondary text-secondary-foreground rounded-md px-3 py-1 text-sm font-medium">
                      {skill.name}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <Button variant="outline" className="w-full mt-4" onClick={() => setIsEditing(false)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Skill
                  </Button>
                )}
        {isEditing && (
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Skill
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Portfolio Links Section */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Github className="h-5 w-5" />
                <a href={Data.portfolioLinks.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  GitHub
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Linkedin className="h-5 w-5" />
                <a href={Data.portfolioLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  LinkedIn
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <ExternalLink className="h-5 w-5" />
                <a href={Data.portfolioLinks.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Website
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                
              </div>
            </CardContent>
          </Card>

                  </div>

        {/* Right Column  */}
        <div className="md:col-span-2 space-y-8">
          {/* Tabs for Projects, Experience, and Posts */}
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="posts" onClick={() => {fetchPosts()
                console.log("Triggered")
              }}>Posts</TabsTrigger>
            </TabsList>
            <TabsContent value="projects" className="space-y-4">
              {Data.projects.map((project, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{project.description}</p>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-2 inline-block">
                      View Project
                    </a>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="experience" className="space-y-4">
              {Data.experience.map((exp, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{exp.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{exp.company}</p>
                    <p className="text-muted-foreground">{exp.year}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="posts" className="space-y-4">
  {loading ? (
    <p>Loading...</p>
  ) : (
    posts.length === 0 ? (
      <p>No posts to display.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Card key={post._id} className="w-full flex flex-col">
            <CardContent className="p-4 space-y-4 flex-grow">
              <img src={post.file} alt="Post" className="h-80 w-80 object- rounded-lg" />
              <p className="mt-2 text-sm">{post.text}</p>
              <hr />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleLikePost(post._id)}
                    className={post?.isLiked ? "text-red-500" : ""}
                  >
                    <Heart className={`mr-1 h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                    {post.likes}
                  </Button>
                </div>
                <Button variant="outline " className="hover:bg-red-300" onClick={() => handleDeletePost(post._id)}>
                  <Trash2 className="mr-2 h-4 w-4 hover:text-emerald-600" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  )}
</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
