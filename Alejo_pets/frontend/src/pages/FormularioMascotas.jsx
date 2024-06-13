import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import img from "../assets/bg.jpg";
import photoIcon from "../assets/photo-lg-0.jpg";
import Close from "../assets/btn-close.jpg";
import save from "../assets/btn-save.jpg";
import modificar from "../assets/btn-update.jpg";
import Camera from "../assets/iconCameraPng.png";
import { useHelpsContext } from "../context/HelpsContext.jsx";
import axiosClient from "../api/axiosClient.js";

const FormMascotas = () => {
  const [generos, setGeneros] = useState([]);
  const [razas, setRazas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const { idMascota, mode, mascota, getMascotasId } = useHelpsContext();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [image, setImagePath] = useState('');

  const [formData, setFormData] = useState({
    nombre: "",
    raza: "",
    categoria: "",
    image: "",
    genero: "",
  });

  useEffect(() => {
    axiosClient.get("/Listarg").then((response) => {
      setGeneros(response.data);
    });
  }, []);

  useEffect(() => {
    axiosClient.get("/razas").then((response) => {
      setRazas(response.data);
    });
  }, []);

  useEffect(() => {
    axiosClient.get("/categorias").then((response) => {
      setCategorias(response.data);
    });
  }, []);

  useEffect(() => {
    if (mode === "update" && idMascota) {
      getMascotasId(idMascota);
    }
  }, [mode, idMascota]);

  useEffect(() => {
    if (mascota && mode === "update") {
      setFormData({
        nombre: mascota.nombre_mascota || "",
        raza: mascota.id_raza || "",
        categoria: mascota.id_categoria || "",
        image: mascota.image || "",
        genero: mascota.id_genero || "",
      });
    }
  }, [mascota, mode]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const createMascotas = async (data) => {
    try {
      axiosClient.post("/RegistrarM", data).then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          navigate("/listpets");
        } else {
          alert(response.data.message);
        }
      });
    } catch (error) {
      console.log("Error del servidor" + error);
    }
  };

  useEffect(() => {
    if (mode === "update" && mascota && mascota.imagen) {
      const fetchImage = async () => {
        const imgPath = `http://localhost:3000/img/${mascota.imagen}`;
        const uploadsPath = `http://localhost:3000/imguploads/${mascota.imagen}`;

        try {
          const imgResponse = await fetch(imgPath, { method: 'HEAD' });
          if (imgResponse.ok) {
            setImagePath(imgPath);
          } else {
            const uploadsResponse = await fetch(uploadsPath, { method: 'HEAD' });
            if (uploadsResponse.ok) {
              setImagePath(uploadsPath);
            } else {
              setImagePath(''); 
            }
          }
        } catch (error) {
          console.error('Error fetching images:', error);
          setImagePath(''); 
        }
      };
      fetchImage();
    }
  }, [mascota]);

  const updateMascotas = (id, data) => {
    try {
      axiosClient.put(`/ActualizarM/${id}`, data).then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          navigate("/listpets");
        } else {
          alert(response.data.message);
        }
      });
    } catch (error) {
      console.log("Error del servidor" + error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datosSubmit = new FormData();
    datosSubmit.append("nombre", formData.nombre);
    datosSubmit.append("raza", formData.raza);
    datosSubmit.append("categoria", formData.categoria);
    datosSubmit.append("imagen", formData.image);
    datosSubmit.append("genero", formData.genero);
    try {
      if (mode === "update") {
        updateMascotas(idMascota, datosSubmit);
      } else {
        datosSubmit.append("fk_user", user.id_user);
        createMascotas(datosSubmit);
      }
    } catch (error) {
      console.log("Error del servidor" + error);
    }
  };

  const logout = () => {
    localStorage.clear();
    alert('Cierre de sesión éxitoso')
    navigate("/");
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen m-3 "
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        
      }}
    >
      <div className="flex mt-24 items-center justify-between">
        <FaAngleLeft
          className="mr-24 flex text-white text-xl cursor-pointer"
          onClick={() => navigate("/listpets")}
        />
        <label className="flex mr-20 text-white font-semibold">
          {mode === "create" ? "Adicionar mascota" : "Actualizar mascota"}
        </label>
        <img
          className="flex justify-between rounded-full cursor-pointer"
          src={Close}
          onClick={() => logout()}
          alt=""
        />
      </div>
      <div className="mt-16">
        {image ? (
          <img className="rounded-full w-40 h-40" src={image} alt={mascota.imagen} />
        ) : (
          <img className={`rounded-full ${mode === "update" ? "w-40 h-40" : ""}`} src={photoIcon} />
        )}
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm pt-24">
        <div className="mb-4">
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-[355px] bg-[#96a2ba] px-3 py-2 text-blue-950 rounded-2xl border border-gray-400 focus:outline-none ml-4 placeholder-blue-950"
            style={{ height: "50px", width: "90%" }}
            required
          />
        </div>
        <div className="mb-4">
          <select
            className="w-[348px] bg-[#96a2ba] px-3 py-2 text-blue-950 rounded-2xl border border-gray-400 focus:outline-none ml-4 placeholder-blue-950"
            value={formData.raza}
            onChange={handleChange}
            name="raza"
            id="raza"
            style={{ height: "50px", width: "90%" }}
          >
            <option value="" hidden>
              Seleccione una raza...
            </option>
            {razas.map((RAZA) => (
              <option key={RAZA.id_raza} value={RAZA.id_raza}>
                {RAZA.nombre_raza}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            className="w-[349px] bg-[#96a2ba] px-3 py-2 text-blue-950 rounded-2xl border border-gray-400 focus:outline-none ml-4 placeholder-blue-950"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            id="categoria"
            style={{ height: "50px", width: "90%" }}
          >
            <option value="" hidden>
              Seleccione categoria...
            </option>
            {categorias.map((Categorias) => (
              <option key={Categorias.id_categoria} value={Categorias.id_categoria}>
                {Categorias.nombre_categoria}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mb-4 flex justify-center">
          <input
            placeholder="Imagen de usuario"
            type="file"
            name="image"
            className="hidden"
            id="fileInput"
            onChange={handleChange}
            style={{ height: "50px", width: "90%" }}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer items-center w-[345px] flex bg-[#96a2ba] rounded-full"
          >
            <div className="flex items-center w-[200px] h-10 transition duration-300" style={{ height: "50px", width: "90%" }}>
              <span className="text-blue-950 w-full ml-4">
                Seleccionar imagen
              </span>
            </div>
          </label>
          <img
            src={Camera}
            alt="camera"
            className="absolute top-0 right-8 mt-3 ml-3 rounded-full"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
        <div className="mb-4">
          <div className="relative">
            <select
              className="w-[350px] bg-[#96a2ba] px-3 py-2 text-blue-950 rounded-2xl border border-gray-400 focus:outline-none ml-4 placeholder-blue-950"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              id="genero"
              style={{ height: "50px", width: "90%" }}
            >
              <option value="" hidden>
                Seleccione genero...
              </option>
              {generos.map((Generos) => (
                <option key={Generos.id_genero} value={Generos.id_genero}>
                  {Generos.nombre_genero}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button>
          {mode === "create" ? (
            <img
              className="rounded-full ml-5 cursor-pointer"
              style={{ width: "90%" }}
              src={save}
              alt=""
              onSubmit={handleSubmit}
            />
          ) : (
            <img
              className="rounded-full ml-5 cursor-pointer"
              style={{ width: "90%" }}
              src={modificar}
              alt=""
              onSubmit={handleSubmit}
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default FormMascotas;
