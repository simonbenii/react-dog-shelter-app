import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dogsData from "../dogs.json";

export default function Public() {
  const [search, setSearch] = useState('');
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [originalDogs, setOriginalDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState('alldogs');

  useEffect(() => {
    setDogs(dogsData);
    setOriginalDogs(dogsData);
    setLoading(false);
  }, []);

  function handleInput(event) {
    setSearch(event.target.value);
    let searchTerm = event.target.value;
    const filterDog = originalDogs.filter(dog => dog.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setDogs(filterDog);
  }

  const handleDropdownChange = (event) => {
    setSelectedDog(event.target.value);
  };

  if (loading) {
    return <h1>LOADING DOGS</h1>;
  }

  return (
    <>
      <div className='admin-panel'>
        <div className='background'></div>
        <label htmlFor='search'>
          <input type='text' name='search' value={search} onInput={handleInput} className='search' placeholder='Find by name' />
        </label>
        <h1 style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
          color: 'white'
        }}>Adopt me</h1>
        <select value={selectedDog} onChange={handleDropdownChange} className='select'>
          <option value="alldogs">All Dogs</option>
          <option value="adoptable">Adoptable Dogs</option>
          <option value="adopted">Adopted Dogs</option>
        </select>
      </div>
      {
        selectedDog === 'alldogs' && (
          <div className='dogCards'>
            {dogs.map((dog) => (
              <div key={dog._id} className='editableDog'>
                <h2>{dog.name}</h2>
                {dog.photoUrl[0] ? (
                  <img src={dog.photoUrl[0]} style={{ maxHeight: '198px', maxWidth: '210px' }} alt={dog.name} />
                ) : (
                  <img
                    src='https://g.petango.com/shared/Photo-Not-Available-dog.gif'
                    style={{ maxWidth: '150px' }}
                    alt='No photo available'
                  />
                )}
                <Link to={`/dogdetails/${encodeURIComponent(dog._id.$oid)}`}>
                  <button>Details</button>
                </Link>
              </div>
            ))}
          </div >
        )
      }

      {
        selectedDog === 'adoptable' && (
          <div className='dogCards'>
            {dogs
              .filter((dog) => dog.adoptable)
              .map((dog) => (
                <div key={dog._id} className='editableDog'>
                  <h2>{dog.name}</h2>
                  {dog.photoUrl[0] ? (
                    <img src={dog.photoUrl[0]} style={{ maxHeight: '198px', maxWidth: '210px' }} alt={dog.name} />
                  ) : (
                    <img
                      src='https://g.petango.com/shared/Photo-Not-Available-dog.gif'
                      style={{ maxWidth: '150px' }}
                      alt='No photo available'
                    />
                  )}
                  <Link to={`/dogdetails/${dog._id}`}>
                    <button>Details</button>
                  </Link>
                </div>
              ))}
          </div >
        )
      }

      {
        selectedDog === 'adopted' && (
          <div className='dogCards'>
            {dogs
              .filter((dog) => !dog.adoptable)
              .map((dog) => (
                <div key={dog._id} className='editableDog'>
                  <h2>{dog.name}</h2>
                  {dog.photoUrl[0] ? (
                    <img src={dog.photoUrl[0]} style={{ maxHeight: '198px', maxWidth: '210px' }} alt={dog.name} />
                  ) : (
                    <img
                      src='https://g.petango.com/shared/Photo-Not-Available-dog.gif'
                      style={{ maxWidth: '150px' }}
                      alt='No photo available'
                    />
                  )}
                  <Link to={`/dogdetails/${dog._id}`}>
                    <button>Details</button>
                  </Link>
                </div>
              ))}
          </div >
        )
      }
    </>
  );
}
