import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const API_BASE_URL = 'http://localhost:3000';

interface Concert {
  id: number;
  performer: string;
  startTime: string;
  duration: number;
  cancelled: boolean;
}

function Home() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [form, setForm] = useState<{ performer: string; startTime: string; duration: string; id: number | null }>({
    performer: '',
    startTime: '',
    duration: '',
    id: null,
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/concerts`).then((res) => setConcerts(res.data));
  }, []);

  const markAsCanceled = (id: number) => {
    axios.patch(`${API_BASE_URL}/concerts/${id}`, { cancelled: true }).then(() => {
      setConcerts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, cancelled: true } : c))
      );
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedData = {
      performer: form.performer,
      startTime: new Date(form.startTime).toISOString(),
      duration: Number(form.duration),
    };

    axios
      .post(`${API_BASE_URL}/concerts`, formattedData)
      .then(() => {
        setShowAddModal(false);
        window.location.reload();
      })
      .catch((error) => console.error('Hiba a létrehozás során:', error.response?.data));
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.id) {
      const formattedData = {
        performer: form.performer,
        startTime: new Date(form.startTime).toISOString(),
        duration: Number(form.duration),
      };

      axios
        .patch(`${API_BASE_URL}/concerts/${form.id}`, formattedData)
        .then(() => {
          setShowEditModal(false);
          window.location.reload();
        })
        .catch((error) => console.error('Hiba a frissítés során:', error.response?.data));
    }
  };

  const openAddModal = () => {
    setForm({ performer: '', startTime: '', duration: '', id: null });
    setShowAddModal(true);
  };

  const handleEdit = (concert: Concert) => {
    setForm({
      performer: concert.performer,
      startTime: new Date(concert.startTime).toISOString().slice(0, 16), // datetime-local formátum
      duration: concert.duration.toString(),
      id: concert.id,
    });
    setShowEditModal(true);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Koncertek</h1>
      <div className="mb-4">
        <button className="btn btn-primary" onClick={openAddModal}>
          Hozzáadás
        </button>
      </div>

      <div className="row">
        {concerts.map((c) => (
          <div key={c.id} className="col-md-4 mb-3">
            <div className={`card ${c.cancelled ? 'bg-danger text-white' : ''}`}>
              <div className="card-body">
                <h5 className="card-title">{c.performer}</h5>
                <p className="card-text">
                  Kezdési idő: {new Date(c.startTime).toLocaleString()}
                  <br />
                  Időtartam: {c.duration} perc
                </p>
                <button className="btn btn-dark me-2" onClick={() => markAsCanceled(c.id)} disabled={c.cancelled}>
                  {c.cancelled ? 'Elmaradt' : 'Elmarad'}
                </button>
                <button className="btn btn-warning" onClick={() => handleEdit(c)}>
                  Szerkesztés
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hozzáadás Modal */}
      {showAddModal && (
        <>
          <div className="modal show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleAddSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">Koncert hozzáadása</h5>
                    <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <input
                      className="form-control mb-2"
                      name="performer"
                      placeholder="Előadó"
                      value={form.performer}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="datetime-local"
                      className="form-control mb-2"
                      name="startTime"
                      value={form.startTime}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="number"
                      className="form-control mb-2"
                      name="duration"
                      placeholder="Időtartam (perc)"
                      value={form.duration}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                      Mégse
                    </button>
                    <button type="submit" className="btn btn-success">
                      Jóváhagyás
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </>
      )}

      {/* Szerkesztés Modal */}
      {showEditModal && (
        <>
          <div className="modal show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleEditSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">Koncert szerkesztése</h5>
                    <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <input
                      className="form-control mb-2"
                      name="performer"
                      placeholder="Előadó"
                      value={form.performer}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="datetime-local"
                      className="form-control mb-2"
                      name="startTime"
                      value={form.startTime}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="number"
                      className="form-control mb-2"
                      name="duration"
                      placeholder="Időtartam (perc)"
                      value={form.duration}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                      Mégse
                    </button>
                    <button type="submit" className="btn btn-success">
                      Mentés
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </>
      )}
    </div>
  );
}

export default Home;
