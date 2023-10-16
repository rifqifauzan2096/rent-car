import Image from '@/node_modules/next/image';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import { fetchCar } from '@/utils/index';
import CarCard from '@/components/CarCard';

export default async function Home() {
  const fetchAllCar = await fetchCar();
  const isDataEmpty =
    !Array.isArray(fetchAllCar) || fetchAllCar.length < 1 || !fetchAllCar;

  console.log(fetchAllCar);

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">{/* customFilter */}</div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {fetchAllCar.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl">Oops, no results</h2>
            <p>{fetchAllCar.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
