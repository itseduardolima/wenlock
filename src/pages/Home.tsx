import { useEffect, useState } from "react"
import { Typography, Paper } from "@mui/material"
import "../styles/home.scss"
import Illustration from "..//assets/images/welcome-img.svg"

const Home = () => {
  const [currentDate, setCurrentDate] = useState("")
  const [userName, setUserName] = useState("Millena")

  useEffect(() => {
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
    const formattedDate = date.toLocaleDateString("pt-BR", options)
    setCurrentDate(formattedDate.replace(" de ", ". "))
  }, [])

  return (
    <div className="home-container">
      <Typography variant="h4" component="h1" className="page-title">
        Home
      </Typography>

      <Paper elevation={0} className="welcome-container">
        <Typography variant="h5" component="h2" className="welcome-title">
          Olá {userName}!
        </Typography>
        <Typography variant="body2" className="welcome-date">
          {currentDate}
        </Typography>

        <div className="welcome-illustration">
          <img src={Illustration} alt="Welcome illustration" className="illustration-image" />
          <div className="welcome-message">Bem-vindo ao WenLock!</div>
        </div>
      </Paper>
    </div>
  )
}

export default Home