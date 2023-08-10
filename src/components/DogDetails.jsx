import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import AddInterest from "./AddInterest";
import dogsData from "../dogs.json";

export default function Details() {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const decodedId = decodeURIComponent(id);
    const selectedDog = dogsData.find((dog) => dog._id.$oid === decodedId);
    if (selectedDog) {
      setDog(selectedDog);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setShowImage(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setShowImage(true);
      }, 500);
    }
  };

  const handleNext = () => {
    if (currentIndex < (dog?.photoUrl?.length || 0) - 1) {
      setShowImage(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setShowImage(true);
      }, 500);
    }
  };

  const handlePhotoClick = (index) => {
    setCurrentIndex(index);
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prevFullScreen) => !prevFullScreen);
  };

  if (loading) {
    return <h1>LOADING DOG...</h1>;
  }

  return (
    <>
      <div className="background"></div>
      <div className="container">
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
            color: "white",
          }}
        >
          {dog ? dog.name : "Dog Not Found"}
        </h1>

        <div
          className={`photo-container ${showImage ? "show" : ""
            } ${isFullScreen ? "full-screen" : ""}`}
        >
          {isFullScreen ? (
            <div
              className="full-screen-image-container"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div onClick={toggleFullScreen}>
                <img
                  src={dog?.photoUrl?.[currentIndex]}
                  alt="Dog"
                  className={`fade-in-out ${showImage ? "show" : ""}`}
                />
              </div>
            </div>
          ) : (
            <>
              <button onClick={handlePrev} disabled={currentIndex === 0}>
                ←
              </button>
              <div>
                <img
                  src={dog?.photoUrl?.[currentIndex]}
                  alt="Dog"
                  className={`fade-in-out ${showImage ? "show" : ""}`}
                />
              </div>
              <button
                onClick={handleNext}
                disabled={currentIndex === (dog?.photoUrl?.length || 0) - 1}
              >
                →
              </button>
            </>
          )}
        </div>
        <button onClick={toggleFullScreen}>View Full Screen</button>

        <div className="photo-thumbnails">
          {dog?.photoUrl?.map((url, index) => (
            <img
              key={url}
              src={url}
              alt="Dog Thumbnail"
              className={`thumbnail ${currentIndex === index ? "active" : ""}`}
              onClick={() => handlePhotoClick(index)}
            />
          ))}
        </div>

        <div className="dog-details">
          <div className="dog-details-section">
            <h2>Breed</h2>
            <p>{dog ? (dog.breeds ? dog.breeds : "-") : "Dog not found"}</p>
          </div>
          <div className="dog-details-section">
            <h2>Colors</h2>
            <p>{dog ? (dog.colors ? dog.colors : "-") : "Dog not found"}</p>
          </div>
          <div className="dog-details-section">
            <h2>Age</h2>
            <p>{dog ? (dog.age ? dog.age : "-") : "Dog not found"}</p>
          </div>
          <div className="dog-details-section">
            <h2>Gender</h2>
            <p>{dog ? (dog.gender ? dog.gender : "-") : "Dog not found"}</p>
          </div>
          <div className="dog-details-section">
            <h2>Size</h2>
            <p>{dog ? (dog.size ? dog.size : "-") : "Dog not found"}</p>
          </div>
          <div className="dog-details-section">
            <h2>Housetrained</h2>
            <p>{dog ? (dog.housetrained ? "Yes" : "No") : "Dog not found"}</p>
          </div>
          <div className="dog-details-section">
            <h2>Attributes</h2>
            <ul className="attributes-list">
              {dog && dog.attributes
                ? dog.attributes.map((attribute) => (
                  <li key={attribute}>{attribute ? attribute : "-"}</li>
                ))
                : "No attributes found"}
            </ul>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
          <button className='want-button' onClick={() => setOpenPopup(true)}>
            I want this dog
          </button>
          <Link to={"/"}>
            <button className='back-button'>Back</button>
          </Link>
        </div>
        <Popup open={openPopup} onClose={() => setOpenPopup(false)}>
          <AddInterest onBack={() => setOpenPopup(false)} />
        </Popup>
      </div>
    </>
  );
}
