import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CToast,
  CToastBody,
  CButton as CButtonClose,
  CFormInput,
  CFormSelect,
  CAlert,
} from '@coreui/react'

const List = () => {
  const [jobApplications, setJobApplications] = useState([])
  const [filteredApplications, setFilteredApplications] = useState([])
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visible, setVisible] = useState(false)
  const [selectedJobId, setSelectedJobId] = useState(null)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('')
  const [selectedEducation, setSelectedEducation] = useState('')

  useEffect(() => {
    fetchJobApplications()
    fetchPositions()
  }, [])

  useEffect(() => {
    setFilteredApplications(
      jobApplications.filter(
        (job) =>
          job.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedPosition === '' || job.position.name === selectedPosition) &&
          (selectedEducation === '' || job.applicant.education === selectedEducation),
      ),
    )
  }, [searchTerm, selectedPosition, selectedEducation, jobApplications])

  const fetchJobApplications = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${process.env.BACKEND_API_BASE_URL}/job-application/getAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      )
      if (response.status === 200 && response.data.status === 'success') {
        setJobApplications(response.data.data)
      } else {
        setError('Failed to fetch job applications')
      }
    } catch (err) {
      console.log(err)
      setError('Error fetching data')
    } finally {
      setLoading(false)
    }
  }

  const fetchPositions = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${process.env.BACKEND_API_BASE_URL}/job-application/positions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      )
      if (response.status === 200) {
        setPositions(response.data.data)
      } else {
        setError('Failed to fetch positions')
      }
    } catch (err) {
      console.log(err)
      setError('Error fetching positions')
    }
  }

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(
        `${process.env.BACKEND_API_BASE_URL}/job-application/delete/${selectedJobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      )
      if (response.status === 200 && response.data.status === 'success') {
        setToastMessage('Job application deleted successfully!')
        setToastVisible(true)
        fetchJobApplications()
      } else {
        setToastMessage('Failed to delete application')
        setToastVisible(true)
      }
    } catch (err) {
      console.log(err)
      setToastMessage('Error deleting data')
      setToastVisible(true)
    } finally {
      setVisible(false)
    }
  }

  const handleShowDeleteModal = (id) => {
    setSelectedJobId(id)
    setVisible(true)
  }

  const handleUpdate = (id) => {
    window.location.href = `/admin/job-application/edit/${id}`
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Job Applications Data</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-4">
              <CCol xs={12} md={4}>
                <CFormInput
                  type="text"
                  placeholder="Search by applicant name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </CCol>
              <CCol xs={12} md={4}>
                <CFormSelect
                  aria-label="Select position"
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                >
                  <option value="">Select Position</option>
                  {positions.map((position) => (
                    <option key={position.id_position} value={position.name}>
                      {position.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol xs={12} md={4}>
                <CFormSelect
                  aria-label="Select Last Education level"
                  value={selectedEducation}
                  onChange={(e) => setSelectedEducation(e.target.value)}
                >
                  <option value="">Select Education Level</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="D1">D1</option>
                  <option value="D2">D2</option>
                  <option value="D3">D3</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                  <option value="Tidak Sekolah">Tidak Sekolah</option>
                </CFormSelect>
              </CCol>
            </CRow>
            {loading && <CAlert color="warning">Loading...</CAlert>}
            {error && <CAlert color="danger">{error}</CAlert>}
            {!loading && !error && (
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Applicant Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tempat dan Tanggal Lahir</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Position</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredApplications.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell
                        colSpan="5"
                        className="text-center"
                        style={{ verticalAlign: 'middle' }}
                      >
                        No job applications found
                      </CTableDataCell>
                    </CTableRow>
                  ) : (
                    filteredApplications.map((job, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{index + 1}</CTableDataCell>
                        <CTableDataCell>{job.applicant.name}</CTableDataCell>
                        <CTableDataCell>
                          {job.applicant.birth_place},{' '}
                          {new Date(job.applicant.birth_date).toLocaleDateString('en-US')}
                        </CTableDataCell>
                        <CTableDataCell>{job.position.name}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color="primary"
                            onClick={() => handleUpdate(job.id_job_application)}
                          >
                            Edit
                          </CButton>{' '}
                          <CButton
                            color="danger"
                            onClick={() => handleShowDeleteModal(job.id_job_application)}
                          >
                            Delete
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  )}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirm Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete this job application? This action cannot be undone.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Toast Notification */}
      <CToast
        autohide={true}
        color="primary"
        className="toast-container position-fixed top-0 end-0 p-3 m-3 text-white"
        visible={toastVisible}
      >
        <div className="d-flex">
          <CToastBody>{toastMessage}</CToastBody>
          <CButtonClose
            className="btn-close btn-close-white me-2 m-auto"
            onClick={() => setToastVisible(false)}
            aria-label="Close"
          />
        </div>
      </CToast>
    </CRow>
  )
}

export default List
