import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

const Breadcrumb = ({ items }) => {
    return (
      <nav className="bg-gray-100 py-4 px-12 font-['Roboto']">
        <ol className="flex flex-wrap items-center text-base">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
  
            return (
              <li key={index} className="flex items-center">
                {index > 0 && <ChevronRight className="mx-2 h-4 w-4 text-gray-400 flex-shrink-0" />}
  
                {isLast ? (
                  <span className="text-gray-500">{item.label}</span>
                ) : (
                  <Link
                    to={item.href}
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }
  
  export default Breadcrumb;
