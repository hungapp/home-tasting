import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ImageLightbox } from "@/components/image-lightbox"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-20 flex items-center border-b bg-[#5D0C1D] text-white">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/hanoi-phoria-logo-full.png"
            alt="Hanoi Phoria Logo"
            width={300}
            height={90}
            className="h-14 w-auto"
          />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Menu
          </Link>
          <Link href="/register" className="text-sm font-medium hover:underline underline-offset-4">
            Register
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#5D0C1D] text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Experience Our Pho Concept at Home
                </h1>
                <p className="text-gray-200 md:text-xl">
                  Sign up for an exclusive home tasting experience and be among the first to try our pho-mula before we
                  open our doors.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="bg-white text-[#5D0C1D] hover:bg-white/90">
                      Reserve Your Spot
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto w-full overflow-hidden rounded-xl">
                <Image
                  src="/images/pho-complete-set.png"
                  alt="Complete Pho Hanoi experience with condiments and fresh herbs"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">Phở Hà Nội</h2>
              <div className="prose prose-invert mx-auto">
                <p>
                  Hanoi Phoria is proud to introduce Hanoi-style pho noodle cuisine to the New England area. While there
                  are different takes on pho in Vietnam, they fall into two main categories: Northern and Southern
                  styles. Hanoi's version, a hallmark of the Northern style, stands out with its pure, authentic flavors
                  and meticulous craft. Inspired by the shared resilience and hearty spirit of New England and Vietnam's
                  northern capital, Hanoi—both places shaped by crisp seasons and a love for comforting, soul-warming
                  food—we believe this distinctive style of pho noodle dishes will feel right at home here, just as it
                  does in Vietnam.
                </p>
              </div>
              <div className="flex justify-center pt-4">
                <div className="w-24 h-1 bg-[#5D0C1D] rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Tasting Menu</h2>
                <p className="max-w-[700px] text-gray-300 md:text-xl">
                  A carefully curated selection of dishes showcasing our culinary vision
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:gap-12">
              {menuItems.map((item, index) => (
                <div key={index} className="flex flex-col items-start gap-4">
                  <ImageLightbox src={item.image || "/placeholder.svg"} alt={item.name} />
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    <p className="text-sm text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/register">
                <Button size="lg" className="mt-8 bg-[#5D0C1D] hover:bg-[#5D0C1D]/90">
                  Reserve Your Tasting Experience
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How to Enjoy Phở Hà Nội</h2>
                <p className="text-gray-300 md:text-xl">
                  The authentic way to savor your bowl of pho Hanoi
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5D0C1D] text-white font-bold">
                      1
                    </div>
                    <h3 className="text-xl font-semibold">Appreciate the Broth</h3>
                  </div>
                  <p className="text-gray-300">
                    Begin by tasting the broth on its own. Hanoi-style pho features a clear, delicate broth that's been
                    simmered for hours with beef bones, star anise, cinnamon, and other aromatics. Take a moment to
                    savor its pure, unaltered flavor.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5D0C1D] text-white font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-semibold">Add Condiments Sparingly</h3>
                  </div>
                  <p className="text-gray-300">
                    Unlike Southern-style pho, Hanoi pho is traditionally enjoyed with minimal condiments. If you prefer to add some acidity to broth, add just a squeeze of lime. If you want to try something bolder, add vinegar with pickled garlic. If you want some heat, add a teaspoon of the homemade chili sauce. Avoid overwhelming the
                    delicate flavors with too many additions.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5D0C1D] text-white font-bold">
                      3
                    </div>
                    <h3 className="text-xl font-semibold">Mix and Match</h3>
                  </div>
                  <p className="text-gray-300">
                    Use your chopsticks to mix the noodles with the broth, ensuring they're well coated. Then, use both
                    chopsticks and the soup spoon to enjoy the noodles, meat, and broth together in each bite for the
                    perfect balance of flavors.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5D0C1D] text-white font-bold">
                      4
                    </div>
                    <h3 className="text-xl font-semibold">Dip the Quẩy</h3>
                  </div>
                  <p className="text-gray-300">
                    Your pho comes with quẩy (fried dough sticks). Try it on its own, then try again after dipping them into the broth. They add a delightful crunch and help soak up the flavorful broth. The texture and flavor will change the longer you let your quẩy sit in the broth. Find your own sweet spot for eating quẩy 😋
                  </p>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-semibold mb-2 text-white">Pho Etiquette Tips:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>It's perfectly acceptable to lift the bowl to drink the last of the broth directly.</li>
                  <li>
                    Slurping is not only allowed but appreciated—it's a sign you're enjoying the noodles and cooling
                    them as you eat.
                  </li>
                  <li>In Hanoi tradition, pho is typically eaten for breakfast, but it's delicious any time of day.</li>
                  <li>
                    The broth should be hot enough to cook the thinly sliced raw beef that's often added just before
                    serving.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6 bg-[#5D0C1D] text-white">
        <p className="text-xs text-gray-200">© 2025 Hanoi Phoria. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-200">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-200">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

const menuItems = [
  {
    name: "Starter: Beef Pho Rolls",
    description:
      "Rice noodle sheets wrapped around savory stir-fried beef, herbs, and lettuce, served with a sweet and tangy dipping sauce.",
    image: "/images/beef-pho-rolls.png",
  },
  {
    name: "Main Course: Signature Pho Hanoi",
    description:
      " 24-hour simmered broth, clear but still rich and aromatic, featuring tender brisket and flank, plus finely chopped raw flank.",
    image: "/images/pho-hanoi-new.png",
  },
  {
    name: "Side: Quẩy - Fried Dough Stick",
    description: "Handcrafted accompaniments that complement our main courses with unique flavor profiles.",
    image: "/images/quay-fried-dough-new.png",
  },
  {
    name: "Beverage: Lime Iced Tea",
    description: "A refreshing citrus tea, served over ice with fresh lime slices for a bright finish to your meal.",
    image: "/images/kumquat-iced-tea.png",
  },
]

