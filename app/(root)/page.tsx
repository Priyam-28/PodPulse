import PodcastCard from "@/components/PodcastCard"
import { podcastData } from "@/constants"


const Home = () => {
  return (
    <div className="mt-9 flex flex-col gap-9 p-8 md:overflow-hidden">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
      </section>

      <div className="podcast_grid">
        {podcastData.map(({id,title,description,imgURL})=>(
          <PodcastCard
            key={id}
            imgURL={imgURL}
            title={title}
            description={description}
            id={id}/>
        ))}
      </div>
    </div>
  )
}

export default Home
