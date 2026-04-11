import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Explore</h3>
                        <ul className="space-y-2">
                            <li><Link href="/#home" className="text-gray-600 hover:text-gray-900">Home</Link></li>
                            <li><Link href="/#about" className="text-gray-600 hover:text-gray-900">About</Link></li>
                            <li><Link href="/#projects" className="text-gray-600 hover:text-gray-900">Projects</Link></li>
                            <li><Link href="/#contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col justify-between">
                        <p className="text-gray-600 italic">~Hard Work pays off~</p>
                        <div className="flex space-x-4 mt-4">
                            <Link href="https://github.com/Nide17" className="text-gray-600 hover:text-gray-900">
                                GitHub
                            </Link>
                            <Link href="https://www.upwork.com/freelancers/~013f5da808a8367c20/" className="text-gray-600 hover:text-gray-900">
                                Upwork
                            </Link>
                            <Link href="https://www.linkedin.com/in/niyomwungeri-parmenide-ishimwe-1a5394123/" className="text-gray-600 hover:text-gray-900">
                                LinkedIn
                            </Link>
                        </div>
                        <p className="text-gray-500 text-sm mt-4">
                            &copy; Niyomwungeri Parmenide Ishimwe {new Date().getFullYear()} - All Rights Reserved
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}