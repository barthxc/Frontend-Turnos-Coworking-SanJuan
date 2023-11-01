import React from 'react';

const Footer = () => {
  return (
    <div className="mt-5">
      <footer className="text-center text-lg-start text-white bg-dark">
        <div className="container p-4 pb-0">
          <section className="">
            <div className="row">
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Coworking.Tec
                </h6>
                <p>
                  Este es un sitio para reservas de turnos, para que realices
                  tus trabajos en nuestras oficinas.
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />
              
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Contacto</h6>
                <p>
                  <i className="fas fa-home mr-3"></i> San Juan, Argentina
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> sanjuan.tec@gmail.com
                </p>
                <p>
                  <i className="fab fa-whatsapp mr-3"></i> 2645856966
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Repositorio GitHub
                </h6>
  
                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: '#3b5998' }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
  
                <a
                    className="btn btn-primary btn-floating m-1"
                    style={{ backgroundColor: '#1BE7FF' }}
                    href="#!"
                    role="button"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3 mb-3">
                <div className="MazNVa wixui-image rYiAuL">
                  <a
                    href="https://api.whatsapp.com/send?phone=+5492645856966&amp;text=Hola!%20Me%20interesar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20acerca%20de%20tus%20oficinas%20"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="j7pOnl"
                  >
                    <img
                      src="https://static.wixstatic.com/media/63b8d1_b244c905907d467f98a24025bd893b63~mv2.png/v1/fill/w_206,h_57,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/boton-whatsapp.png"
                      alt="boton-whatsapp.png"
                      style={{
                        width: "206px",
                        height: "57px",
                        objectFit: "cover",
                      }}
                      width="206"
                      height="57"
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="text-center p-3" style={{ backgroundColor: '#561D25' }}>
  © 2023 Copyright:
  <div className="container">
    <div className="row">
      <div className="col-md-4">
        <a className="text-white" href="https://mdbootstrap.com/">
          Pablo Bartolomé
        </a>
      </div>
      <div className="col-md-4">
        <a className="text-white" href="#">
          Carolina Sosa
        </a>
      </div>
      <div className="col-md-4">
        <a className="text-white" href="#">
          Caren Cozzi
        </a>
      </div>
    </div>
  </div>
</div>

      </footer>
    </div>
  );
};

export default Footer;
