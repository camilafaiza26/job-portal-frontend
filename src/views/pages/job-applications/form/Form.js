/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CFormLabel,
  CFormText,
  CFormTextarea,
} from '@coreui/react'

const ApplicantForm = () => {
  const [applicantData, setApplicantData] = useState({
    name: '',
    nik: '',
    birthPlace: '',
    birthDate: '',
    gender: '',
    religion: '',
    bloodType: '',
    status: '',
    ktpAddress: '',
    currentAddress: '',
    phoneNumber: '',
    emergencyContactName: '',
    emergencyPhoneNumber: '',
    skills: [],
    trainings: [],
    experiences: [],
    educations: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchJobApplication = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${process.env.BACKEND_API_BASE_URL}/job-application/detail/24`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      )
      if (response.status === 200 && response.data.status === 'success') {
        setApplicantData(response.data.data)
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

  useEffect(() => {
    fetchJobApplication()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(applicantData)
  }

  return (
    <CCard>
      <CCardHeader>
        <strong>Applicant Form</strong>
      </CCardHeader>
      <CCardBody>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
            <CCol xs={12} md={6}>
                <CFormLabel htmlFor="nik">NIK</CFormLabel>
                <CFormInput
                  id="nik"
                  value={applicantData.applicant.nik}
                  onChange={(e) => setApplicantData({ ...applicantData, nik: e.target.value })}
                />
              </CCol>
              <CCol xs={12} md={6}>
                <CFormLabel htmlFor="name">Name</CFormLabel>
                <CFormInput
                  id="name"
                  value={applicantData.applicant.name}
                  onChange={(e) => setApplicantData({ ...applicantData, name: e.target.value })}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              
              <CCol xs={12} md={6}>
                <CFormLabel htmlFor="birthPlace">Birth Place</CFormLabel>
                <CFormInput
                  id="birthPlace"
                  value={applicantData.applicant.birth_place}
                  onChange={(e) =>
                    setApplicantData({ ...applicantData, birthPlace: e.target.value })
                  }
                />
              </CCol>
              <CCol xs={12} md={6}>
                <CFormLabel htmlFor="birthDate">Birth Date</CFormLabel>
                <CFormInput
                  type="date"
                  id="birthDate"
                  value={applicantData.applicant.birth_date}
                  onChange={(e) =>
                    setApplicantData({ ...applicantData, birthDate: e.target.value })
                  }
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">      
              <CCol xs={12} md={6}>
                <CFormLabel htmlFor="gender">Gender</CFormLabel>
                <CFormSelect
                  id="gender"
                  value={applicantData.applicant.gender}
                  onChange={(e) => setApplicantData({ ...applicantData, gender: e.target.value })}
                >
                  <option value="F">Female</option>
                  <option value="M">Male</option>
                </CFormSelect>
              </CCol>
              <CCol xs={12} md={6}>
                <CFormLabel htmlFor="religion">Religion</CFormLabel>
                <CFormInput
                  id="religion"
                  value={applicantData.applicant.religion}
                  onChange={(e) =>
                    setApplicantData({ ...applicantData, religion: e.target.value })
                  }
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
            <CCol xs={12} md={6}>
                <CFormLabel htmlFor="status">Marital Status</CFormLabel>
                <CFormInput
                  id="status"
                  value={applicantData.applicant.status}
                  onChange={(e) => setApplicantData({ ...applicantData, status: e.target.value })}
                />
              </CCol>
              <CCol xs={12} md={6}>
                <CFormLabel htmlFor="bloodType">Blood Type</CFormLabel>
                <CFormInput
                  id="bloodType"
                  value={applicantData.applicant.blood_type}
                  onChange={(e) =>
                    setApplicantData({ ...applicantData, bloodType: e.target.value })
                  }
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">             
              <CCol xs={12} md={6}>
                <CFormLabel htmlFor="ktpAddress">KTP Address</CFormLabel>
                <CFormTextarea
                  id="ktpAddress"
                  value={applicantData.applicant.ktp_address}
                  onChange={(e) =>
                    setApplicantData({ ...applicantData, ktpAddress: e.target.value })
                  }
                >{applicantData.applicant.ktp_address}</CFormTextarea>
                 <CCol xs={12} md={6}>
                <CFormLabel htmlFor="currentAddress">Current Address</CFormLabel>
                <CFormInput
                  id="currentAddress"
                  value={applicantData.applicant.current_address}
                  onChange={(e) =>
                    setApplicantData({ ...applicantData, currentAddress: e.target.value })
                  }
                />
              </CCol>
              </CCol>
            </CRow>
            <CRow className="mb-3">
             
              <CCol xs={12} md={6}>
                <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
                <CFormInput
                  id="phoneNumber"
                  value={applicantData.applicant.phone_number}
                  onChange={(e) =>
                    setApplicantData({ ...applicantData, phoneNumber: e.target.value })
                  }
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol xs={12} md={6}>
                <CFormLabel htmlFor="emergencyContactName">Emergency Contact Name</CFormLabel>
                <CFormInput
                  id="emergencyContactName"
                  value={applicantData.applicant.emergency_contact_name}
                  onChange={(e) =>
                    setApplicantData({ ...applicantData, emergencyContactName: e.target.value })
                  }
                />
              </CCol>
              <CCol xs={12} md={6}>
                <CFormLabel htmlFor="emergencyPhoneNumber">Emergency Phone Number</CFormLabel>
                <CFormInput
                  id="emergencyPhoneNumber"
                  value={applicantData.applicant.emergency_phone_number}
                  onChange={(e) =>
                    setApplicantData({ ...applicantData, emergency_phone_number: e.target.value })
                  }
                />
              </CCol>
            </CRow>

          
            
            <CButton type="submit">Submit</CButton>
          </CForm>
        )}
      </CCardBody>
    </CCard>
  )
}

export default ApplicantForm
