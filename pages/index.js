import React, { useRef, useState, useEffect } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: PowderBlue;
  }
`;

const Title = styled.h1`
  color: DarkCyan;
  font-family: Courier New;
`;

const TitleTarefas = styled.h4`
  color: DarkCyan;
  font-family: Courier New;
  font-size: 24px;
`;

const StyledForm = styled.form`
  background-color: LightSkyBlue;
  width: 300px; /* Set the desired width of the form */
  padding-top: 0.01px;
  padding-left: 12px;
  padding-bottom: 12px;
  margin-bottom: 80px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const StyledLabel = styled.label`
  font-size: 12px;
  align-self: flex-start;
  width: 75px;
`;

const StyledTextarea = styled.textarea`
  max-height: 80px;
  width: 171.5px;
  min-height: 40px;
  font-size: 12px;
  resize: vertical;
  overflow: auto;
`;

const StyledSpan = styled.span`
  color: Red;
  font-size: 10px;
`;

const StyledDiv = styled.div`
  display: flex;
  margin-top: ${props => props.marginTop};
  margin-right: 10px;

  ${props => {
    if (props.center) {
      return css`
      justify-content: center;
      align-items: center;
      flex-direction: column;
      `;
    } else {
      return css`
      justify-content: flex-end;
    `;
    }
  }}
`;

const StyledTarefa = styled.div`
  color: DimGrey;
  font-family: Courier New;
  font-size: 17px;
  font-weight: 900;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  background-color: PaleTurquoise;
  margin-bottom: 20px;
  padding-top: 10px;
  padding-left: 12px;
  padding-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledSemTarefas = styled.div`
  display: flex;
  justify-content: center;
  color: DimGrey;
  font-family: Courier New;
  font-size: 20px;
  font-weight: 900;
  background-color: Gainsboro;
  margin-bottom: 20px;
  padding-top: 1px;
  padding-left: 12px;
  padding-bottom: 1px;
`;

const ScratchLine = styled.div`
  position: absolute;
  top: 45%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  height: 2.5px;
  background-color: DarkRed;
  width: ${props => props.scratchWidth}px;
`;

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: PapayaWhip;
  width: 390px; /* Set the desired width of the form */
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledNomeTarefa = styled.label`
  margin-bottom: 15px;
`;

const StyledSemDescricao = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  border-style: Solid;
  border-color: rgb(215,215,215);
  border-width: 1px;
  width: 200px;
  height: 25px;
  font-family: Serif;
  font-size: 10.5px;
  font-weight: 400;
  background-color: rgb(230,230,230);
  padding-top: 1px;
  padding-bottom: 1px;
`;

const StyledEditTarefa = styled.label`
  font-size: 10px;
  margin-left: 10px;
`;

function Form({ handleSubmit }) {
  const formRef = useRef(null);
  const [erroVazio, setErroVazio] = useState(false);
  const [erroExcesso, setErroExcesso] = useState(false);

  return (
    <StyledForm ref={formRef} onSubmit={(event) => {
      event.preventDefault();

      setErroVazio(false);
      setErroExcesso(false);
      
      const todo = event.target.elements;
      const nome = todo.nome.value;
      if (nome.trim() !== '' && nome.length<=30) {
        handleSubmit(todo);
        formRef.current.reset();
      } else {
        if (nome.trim() === '') setErroVazio(true); 
        if (nome.length>30) setErroExcesso(true);
      }
    }}
    >
      <div>
        <h3>
          Nova Tarefa
        </h3>
        <div style={{display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'column'}}>
          <div style={{display: 'flex', alignItems: 'flex-start'}}>
            <StyledLabel>Nome</StyledLabel>
            <input name="nome" />
          </div>
          <div style={{width: '220px',
                      display: 'flex',
                      justifyContent: 'flex-end'}}>
            {erroVazio ? (
              <StyledSpan>Input Vazio</StyledSpan>
            ) : null}
            {erroExcesso ? (
              <StyledSpan>Input excede 30 caracteres</StyledSpan>
            ) : null}
          </div>
          <div style={{display: 'flex', alignItems: 'flex-start', marginTop: '10px'}}>
            <StyledLabel>Descrição</StyledLabel>
            <StyledTextarea name="descricao" />
          </div>
        </div>
        <br />
        <StyledDiv center={false} marginTop="30px">
          <button type="submit">CRIAR</button>
        </StyledDiv>
      </div>
    </StyledForm>
  );
}

function ListaTarefas() {
  const [incompletos, setIncompletos] = useState([]);
  useEffect(() => {
    let storedIncompletos;
    storedIncompletos = localStorage.getItem("incompletos");
    setIncompletos (() => {return storedIncompletos ? JSON.parse(storedIncompletos) : []});
  }, []);
  const [completos, setCompletos] = useState([]);
  useEffect(() => {
    let storedCompletos;
    storedCompletos = localStorage.getItem("completos");
    storedCompletos ? JSON.parse(storedCompletos) : [];
    setCompletos (() => {return storedCompletos ? JSON.parse(storedCompletos) : []});
  }, []);
  const [showCompletos, setShowCompletos] = useState(true);
  const [showIncompletos, setShowIncompletos] = useState(true);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [originalTodo, setOriginalTodo] = useState(null);
  const formRef = useRef(null);

  const handleSubmit = (todo) => {
    const nome = todo.nome.value.toUpperCase();
    const descricao = todo.descricao.value;

    const newTodo = {
      nome,
      descricao
    };

    setIncompletos([...incompletos,newTodo]);
  }

  const handleComplete = (index) => {
    const newTodos = incompletos.filter ((todo, todoIndex) => {
      if (todoIndex === index) {
        setCompletos([...completos,todo])
      }

      return todoIndex !== index;
    });

    setIncompletos(newTodos);
  }

  const handleCancelar = (index) => {
    const newTodos = completos.filter ((todo, todoIndex) => {
      if (todoIndex === index) {
        setIncompletos([...incompletos,todo])
      }

      return todoIndex !== index;
    });

    setCompletos(newTodos);
  }

  const handleEditChange = (event, index, field) => {
    const value = event.target.value;

    setIncompletos((prevIncompletos) => {
      const updatedIncompletos = [...prevIncompletos];
      updatedIncompletos[index][field] = value;
      return updatedIncompletos;
    });
  };

  const handleCancelEdit = () => {
    setIncompletos((prevIncompletos) => {
      const updatedIncompletos = [...prevIncompletos];
      updatedIncompletos[editingIndex] = originalTodo;
      return updatedIncompletos;
    });
  };

  useEffect(() => {
    localStorage.setItem("incompletos", JSON.stringify(incompletos));
    localStorage.setItem('completos', JSON.stringify(completos));
  }, [incompletos, completos]);

  useEffect(() => {
    const calculateScratchWidth = () => {
      const tarefaElements = document.querySelectorAll('.tarefa-label');
      tarefaElements.forEach((element) => {
        const scratchLine = element.nextElementSibling;
        const todoWidth = element.offsetWidth;
        scratchLine.style.width = `${todoWidth}px`;
      });
    };

    calculateScratchWidth();
    window.addEventListener('resize', calculateScratchWidth);
  
    return () => {
      window.removeEventListener('resize', calculateScratchWidth);
    };
  }, [completos, showCompletos, showIncompletos]);

  const filteredCompletos = showCompletos ? completos : [];
  const filteredIncompletos = showIncompletos ? incompletos : [];

  return (
    <>
      <Form handleSubmit={handleSubmit} />

      <div>
        {(completos.length !== 0 || incompletos.length !== 0) ? (
          <>
            <TitleTarefas>
              Tarefas:
            </TitleTarefas>
              {filteredIncompletos.map((todo, index) => {
                return (
                  <StyledTarefa key={index}>
                    { (editingIndex !== index) ? (
                      <>
                        <div style={{display: 'flex',
                                      flexDirection: 'column',
                                      marginBottom: '25px'
                                    }}>
                          <StyledNomeTarefa>
                            {todo.nome}
                          </StyledNomeTarefa>
                          { (todo.descricao.length>0) ? (
                            <textarea
                            value={todo.descricao}
                            readOnly
                            style={{
                              marginLeft: '10px',
                              backgroundColor: 'rgb(245,245,245)',
                              borderStyle: 'solid',
                              borderColor: 'rgb(220,220,220)',
                              fontSize: '10.5px',
                              fontFamily: 'Serif',
                              width: '100%',
                              maxWidth: '70%',
                              minHeight: '45px',
                              maxHeight: '100px',
                              resize: 'vertical',
                              overflow: 'auto',
                            }}
                            />
                          ) : (
                            <StyledSemDescricao>
                              Sem Descrição
                            </StyledSemDescricao>
                          )}
                        </div>
                        <StyledDiv marginTop="15px">
                          <button style={{marginRight: '5px'}}
                          onClick={() => handleComplete(index)}>
                            FEITO
                          </button>
                          <button style={{marginRight: '5px'}}
                            onClick={() => {
                              const newTodos = incompletos.filter((todo, todoIndex) => {
                                return todoIndex !== index;
                              });

                              setIncompletos(newTodos);
                            }}
                          >
                            REMOVER
                          </button>
                          <button onClick={() => {
                            setOriginalTodo({ ...incompletos[index] });
                            setEditingIndex(index);
                          }}>
                            ✏️
                          </button>
                        </StyledDiv>
                      </>
                    ) : (
                      <>
                        <div style={{display: 'flex',
                                      flexDirection: 'column',
                                      marginBottom: '25px'
                                    }}>
                          <input
                            name="nome"
                            style={{height: '15px', width: '180px', marginBottom: '15px'}}
                            value={incompletos[editingIndex].nome}
                            onChange={(event) => handleEditChange(event, editingIndex, 'nome')}
                          />
                          <StyledTextarea
                            name="descricao"
                            style={{marginLeft: '10px', width: '70%'}}
                            value={incompletos[editingIndex].descricao}
                            onChange={(event) => handleEditChange(event, editingIndex, 'descricao')}
                          />
                        </div>
                        
                        <StyledDiv marginTop="15px">
                          <button style={{marginRight: '5px'}}
                                  onClick={() => {
                                    handleCancelEdit();
                                    setEditingIndex(-1);
                                    }}>
                            CANCELAR
                          </button>
                          <button onClick={() => {
                            setEditingIndex(-1);
                          }}>
                            SAVE
                          </button>
                        </StyledDiv>
                      </>
                    )}
                    
                  </StyledTarefa>
                )
              })}
              {filteredCompletos.map((todo, index) => {
                return (
                  <StyledTarefa key={index}>
                    <div style={{marginBottom: '25px'}}>
                      <div style={{marginBottom: '15px', position: 'relative', filter: 'blur(0.7px)'}}>
                        <label className="tarefa-label">
                          {todo.nome}
                        </label>
                        <ScratchLine className="scratch-line" />
                      </div>
                      { (todo.descricao.length>0) ? (
                        <textarea
                        value={todo.descricao}
                        readOnly
                        style={{
                          marginLeft: '10px',
                          backgroundColor: 'rgb(245,245,245)',
                          borderStyle: 'solid',
                          borderColor: 'rgb(220,220,220)',
                          fontSize: '10.5px',
                          fontFamily: 'Serif',
                          width: '100%',
                          maxWidth: '70%',
                          minHeight: '45px',
                          maxHeight: '100px',
                          resize: 'vertical',
                          overflow: 'auto',
                        }}
                        />
                      ) : (
                        <StyledSemDescricao>
                          Sem Descrição
                        </StyledSemDescricao>
                      )}
                    </div>
                    <StyledDiv marginTop="0px">
                      <button style={{marginRight: '5px'}}
                      onClick={() => handleCancelar(index)}>
                        CANCELAR
                      </button>
                      <button
                        onClick={() => {
                          const newTodos = completos.filter((todo, todoIndex) => {
                            return todoIndex !== index;
                          });

                          setCompletos(newTodos);
                        }}
                      >
                        REMOVER
                      </button>
                    </StyledDiv>
                  </StyledTarefa>
                )
              })}

              <div style={{ marginTop: '70px', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
                <button style={{ alignSelf: 'flex-end', marginBottom: '10px', width: '168px' }}
                  onClick={() => {
                    setShowCompletos(!showCompletos);
                  }}
                >
                  {showCompletos ? 'OCULTAR CONCLUÍDOS' : 'MOSTRAR CONCLUÍDOS'}
                </button>
                <button style={{ alignSelf: 'flex-end', marginBottom: '15px', width: '168px'  }}
                  onClick={() => {
                    setShowIncompletos(!showIncompletos);
                  }}
                >
                  {showIncompletos ? 'OCULTAR INCOMPLETOS' : 'MOSTRAR INCOMPLETOS'}
                </button>
              </div>
          </>
        ) : (
          <StyledSemTarefas>
            SEM TAREFAS
          </StyledSemTarefas>
        )}
      </div>      
    </>
  )
}

export default function IndexPage() {
  return (
    <>
      <GlobalStyles />
      <StyledMain>
        <div>
          <Title>Lista de Tarefas</Title>

          <ListaTarefas />
        </div>
      </StyledMain>
    </>
  );
}
