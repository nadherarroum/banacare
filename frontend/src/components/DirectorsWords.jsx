const DirectorsWords = () => {
  return (
    <section className="director py-5">
      <div className="row align-items-center">
        <div className="col-md-7 bg-gray-light p-5">
          <div className="h-100x ">
            <div className="container py-5 director_quote">
              <h2 className="cursive-title pb-3">Director’s Words</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                sagittis eget sapien in congue. Nullam vitae posuere diam, vel
                suscipit lorem. Maecenas magna augue, pulvinar vel ligula nec,
                gravida tempor
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-5 image_container">
          <div className="director_image" style={{ maxHeight: '600px' }}></div>
          <div className="h-100x p-5x "></div>
        </div>
      </div>
    </section>
  );
};

export default DirectorsWords;
