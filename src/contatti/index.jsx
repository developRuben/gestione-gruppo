import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { getDatabaseTable } from '../firebase'
import { get, push, set } from 'firebase/database'
import { Button, TextField } from '@mui/material'
import Icon from '../icon'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../navbar'

export default function Contatti() {
  const [data, setData] = useState()
  const [isAddingNewRow, setIsAddingNewRow] = useState(false)
  const [formValue, setFormValue] = useState({
    cellulare: '',
    indirizzo: '',
    nome: '',
    paese: '',
    telefono: '',
    visitaIncoraggiamento: '',
    nicolas: '',
    ruben: '',
  })
  const [isEditing, setIsEditing] = useState('')

  const table = getDatabaseTable('contatti')
  const fetchData = () => {
    get(table).then((snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val())
      }
    })
  }
  const setValues = (value, key) => {
    setFormValue((prev) => ({ ...prev, [key]: value }))
  }
  const setContattiData = () => {
    push(table, formValue)
    setIsAddingNewRow(false)
    clearForm()
    fetchData()
  }
  const editRow = () => {
    const currentRow = getDatabaseTable(`contatti/${isEditing}`)
    set(currentRow, formValue)
    setIsEditing('')
    clearForm()
    fetchData()
  }

  const removeRow = (id) => {
    const currentRow = getDatabaseTable(`contatti/${id}`)
    set(currentRow, null)
    fetchData()
  }

  const clearForm = () => {
    setFormValue({
      cellulare: '',
      indirizzo: '',
      nome: '',
      paese: '',
      telefono: '',
      visitaIncoraggiamento: '',
      nicolas: '',
      ruben: '',
    })
  }

  const transformData = (dataInput) => {
    // Dividi la stringa della data in anno, mese e giorno

    // Estrai anno, mese e giorno
    var anno = dataInput.split('-')[0]
    var mese = dataInput.split('-')[1]
    var giorno = dataInput.split('-')[2]

    // Formatta la data come gg/mm/aaaa
    return giorno + '/' + mese + '/' + anno
  }

  const getFormattedDate = (dataInput) => {
    var anno = dataInput.split('/')[2]
    var mese = dataInput.split('/')[1]
    var giorno = dataInput.split('/')[0]

    return anno + '-' + mese + '-' + giorno
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Navbar></Navbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <caption>
            <Button
              fullWidth
              variant="contained"
              endIcon={<Icon icon={fas.faPlus}></Icon>}
              onClick={() => {
                setIsAddingNewRow(true)
              }}
              disabled={isAddingNewRow}
            >
              AGGIUNGI NUOVO PROCLAMATORE
            </Button>
          </caption>
          <TableHead>
            <TableRow>
              <TableCell align="center">NOME</TableCell>
              <TableCell align="center">CELLULARE</TableCell>
              <TableCell align="center">TELEFONO</TableCell>
              <TableCell align="center">INDIRIZZO</TableCell>
              <TableCell align="center">PAESE</TableCell>
              <TableCell align="center">VISITA INCORAGGIAMENTO</TableCell>
              <TableCell align="center">SERVIZIO-NICOLAS</TableCell>
              <TableCell align="center">SERVIZIO-RUBEN</TableCell>
              <TableCell align="center">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && (
              <>
                {Object.entries(data).map((row, index) => (
                  <>
                    {isEditing !== row[0] && (
                      <TableRow key={`row-${index}`}>
                        <TableCell align="center" component="th" scope="row">
                          {row[1].nome}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {row[1].cellulare}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {row[1].telefono}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {row[1].indirizzo}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {row[1].paese}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {row[1]['visitaIncoraggiamento']}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {row[1].nicolas}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {row[1].ruben}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <Button
                            onClick={() => {
                              setIsEditing(row[0])
                              setFormValue(row[1])
                            }}
                          >
                            <Icon icon={fas.faEdit}></Icon>
                          </Button>
                          <Button
                            onClick={() => {
                              removeRow(row[0])
                            }}
                          >
                            <Icon icon={fas.faClose}></Icon>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                    {isEditing === row[0] && (
                      <TableRow key={`row-${index}-edit`}>
                        <TableCell align="center" component="th" scope="row">
                          <TextField
                            label="nome"
                            variant="outlined"
                            onChange={(e) => {
                              setValues(e.target.value, 'nome')
                            }}
                            value={formValue.nome}
                          ></TextField>
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <TextField
                            label="cellulare"
                            variant="outlined"
                            onChange={(e) => {
                              setValues(e.target.value, 'cellulare')
                            }}
                            value={formValue.cellulare}
                          ></TextField>
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <TextField
                            label="telefono"
                            variant="outlined"
                            onChange={(e) => {
                              setValues(e.target.value, 'telefono')
                            }}
                            value={formValue.telefono}
                          ></TextField>
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <TextField
                            label="indirizzo"
                            variant="outlined"
                            onChange={(e) => {
                              setValues(e.target.value, 'indirizzo')
                            }}
                            value={formValue.indirizzo}
                          ></TextField>
                        </TableCell>

                        <TableCell align="center" component="th" scope="row">
                          <TextField
                            label="paese"
                            variant="outlined"
                            onChange={(e) => {
                              setValues(e.target.value, 'paese')
                            }}
                            value={formValue.paese}
                          ></TextField>
                        </TableCell>

                        <TableCell align="center" component="th" scope="row">
                          <TextField
                            label="visita incoraggiamento"
                            variant="outlined"
                            onChange={(e) => {
                              setValues(
                                transformData(e.target.value),
                                'visitaIncoraggiamento',
                              )
                            }}
                            type="date"
                            value={getFormattedDate(
                              formValue.visitaIncoraggiamento,
                            )}
                          ></TextField>
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <TextField
                            label="nicolas"
                            variant="outlined"
                            onChange={(e) => {
                              setValues(
                                transformData(e.target.value),
                                'nicolas',
                              )
                            }}
                            value={getFormattedDate(formValue.nicolas)}
                            type="date"
                          ></TextField>
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <TextField
                            label="ruben"
                            variant="outlined"
                            onChange={(e) => {
                              setValues(transformData(e.target.value), 'ruben')
                            }}
                            value={getFormattedDate(formValue.ruben)}
                            type="date"
                          ></TextField>
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <Button onClick={editRow}>
                            <Icon icon={fas.faSave}></Icon>
                          </Button>
                          <Button
                            onClick={() => {
                              setIsEditing('')
                            }}
                          >
                            <Icon icon={fas.faClose}></Icon>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </>
            )}
            {isAddingNewRow && (
              <TableRow key={`add-row`}>
                <TableCell align="center" component="th" scope="row">
                  <TextField
                    label="nome"
                    variant="outlined"
                    onChange={(e) => {
                      setValues(e.target.value, 'nome')
                    }}
                    value={formValue.nome}
                  ></TextField>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <TextField
                    label="cellulare"
                    variant="outlined"
                    onChange={(e) => {
                      setValues(e.target.value, 'cellulare')
                    }}
                    value={formValue.cellulare}
                  ></TextField>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <TextField
                    label="telefono"
                    variant="outlined"
                    onChange={(e) => {
                      setValues(e.target.value, 'telefono')
                    }}
                    value={formValue.telefono}
                  ></TextField>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <TextField
                    label="indirizzo"
                    variant="outlined"
                    onChange={(e) => {
                      setValues(e.target.value, 'indirizzo')
                    }}
                    value={formValue.indirizzo}
                  ></TextField>
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  <TextField
                    label="paese"
                    variant="outlined"
                    onChange={(e) => {
                      setValues(e.target.value, 'paese')
                    }}
                    value={formValue.paese}
                  ></TextField>
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  <TextField
                    label="visita incoraggiamento"
                    variant="outlined"
                    onChange={(e) => {
                      setValues(
                        transformData(e.target.value),
                        'visitaIncoraggiamento',
                      )
                    }}
                    type="date"
                    value={getFormattedDate(formValue.visitaIncoraggiamento)}
                  ></TextField>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <TextField
                    label="nicolas"
                    variant="outlined"
                    onChange={(e) => {
                      setValues(transformData(e.target.value), 'nicolas')
                    }}
                    value={getFormattedDate(formValue.nicolas)}
                    type="date"
                  ></TextField>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <TextField
                    label="ruben"
                    variant="outlined"
                    onChange={(e) => {
                      setValues(transformData(e.target.value), 'ruben')
                    }}
                    value={getFormattedDate(formValue.ruben)}
                    type="date"
                  ></TextField>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <Button onClick={setContattiData}>
                    <Icon icon={fas.faSave}></Icon>
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAddingNewRow(false)
                    }}
                  >
                    <Icon icon={fas.faClose}></Icon>
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <footer>
        <p>© 2024 - GESTIONALE SAVA 2 </p>
      </footer>
    </div>
  )
}
