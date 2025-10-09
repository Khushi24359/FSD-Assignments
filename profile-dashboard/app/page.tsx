import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { ProfileCard } from "@/components/profile-card"
import { ActivityList } from "@/components/activity-list"

type Activity = {
  id: string
  title: string
  timestamp: string
  description: string
}

export default function Page() {
  const user = {
    name: "Khushi Tiwari",
    bio: "Cybersecurity Enthusiast | Tech Innovator | Music Lover",
    avatarUrl : "/profile.png",
  }

  const activities: Activity[] = [
  {
    id: "1",
    title: "Implemented vulnerability scan feature in WebGuard",
    timestamp: "2 hours ago",
    description: "Integrated OWASP ZAP API and displayed live scan results on the dashboard.",
  },
  {
    id: "2",
    title: "Designed responsive profile dashboard UI",
    timestamp: "1 day ago",
    description: "Created a clean Next.js layout with reusable components and Tailwind styling.",
  },
  {
    id: "3",
    title: "Pushed commit: Secure authentication update",
    timestamp: "3 days ago",
    description: "Added JWT-based login flow and improved CSRF protection for all routes.",
  },
];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      {/* Fixed Navbar */}
      <Navbar title="My Dashboard" userName={user.name} avatarUrl={user.avatarUrl} />
      
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-28">
        {/* Profile Card Section */}
        <div className="rounded-2xl bg-white/80 dark:bg-slate-800/60 shadow-xl backdrop-blur-lg border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center md:items-start p-6 md:p-8 mb-10 md:mb-16 gap-6 transition-transform hover:scale-[1.01]">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 dark:border-blue-600 shadow-md"
          />
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
              {user.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              {user.bio}
            </p>
          </div>
        </div>

        {/* Activities Section */}
        <div>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">
            Recent Activities
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-200 border border-slate-200 dark:border-slate-700"
              >
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
                  {activity.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  {activity.timestamp}
                </p>
                <p className="text-slate-700 dark:text-slate-300">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
