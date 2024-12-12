import './WeatherCard.scss'

const WeatherCard = () => {
  return (
    <div className='WeatherCard'>
        <section className='WeatherCard__mainSection'>
            <div className='WeatherCard__text'>
                <p>London UK</p>
                <p>Today Oct 18</p>
                <p>16 C</p>
                <p>Message</p>
            </div>
        </section>
        <section className='SubSection'></section>
    </div>
  )
}

export default WeatherCard