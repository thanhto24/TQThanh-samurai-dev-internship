import {Home} from "lucide-react"

export default function LogoHome(){
    return (
        <div className="flex items-center space-x-2 mb-8 w-full justify-center">
            <Home className="h-8 w-8" />
            <span className="text-lg font-bold">Acme</span>
        </div>
    )
}