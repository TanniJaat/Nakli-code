
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

import Questions from "./components/Questions"


function App() {
 

  return (
    <main className="w-[100%] min-h-[100vh] relative text-white bg-[#1A1A1A] h-[full]  flex items-center flex-col  overflow-y-hidden ">
       <Navbar/>
        <div className="max-w-screen-lg w-screen">
     
        <Questions />
          <div className="h-1 mt-7 mb-3  bg-white opacity-60" />
        <Footer/>
       </div>
    </main>
  )
}

export default App
