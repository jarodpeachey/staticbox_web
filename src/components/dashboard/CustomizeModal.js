import React, { useState, useContext, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import Modal from '../Modal';
import Spacer from '../Spacer';
import Button from '../Button';
import { AppContext } from '../../providers/AppProvider';
// import { AuthContext } from '../../providers/DatabaseProvider';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import Row from '../grid/Row';
import Accordion from '../Accordion';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import DelayedLoad from '../DelayedLoad';

const CustomizeModal = () => {
  const { state, q } = useContext(DatabaseContext);
  const { site, siteClient } = state;

  const [colors, setColors] = useState({
    primary: '#fbbe76',
    secondary: '#aacd67',
  });

  const [labelStyles, setLabelStyles] = useState({
    fontSize: 16,
    customCSS: 'margin: 0;',
  });

  const [inputStyles, setInputStyles] = useState({
    fontSize: 16,
    customCSS: 'margin: 0;',
    paddingX: 16,
    paddingY: 16,
  });

  const [buttonStyles, setButtonStyles] = useState({
    customCSS: 'margin: 0;',
  });

  const {
    setCustomizeModalOpen,
    setNotificationMessage,
    setNotificationType,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [reRender, setRender] = useState(true);
  const [stylesID, setStylesID] = useState('');

  useEffect(() => {
    console.log(site.ref);
    siteClient
      .query(
        q.Let(
          {
            styles: q.Get(q.Match(q.Index('styles_by_site'), site.ref)),
          },
          q.Var('styles')
        )
      )
      .then((response) => {
        console.log(response);
        setStylesID(response.ref.value.id);
        setColors({
          ...response.data.color,
        });
        setLabelStyles({
          ...response.data.label,
        });
        setInputStyles({
          ...response.data.input,
        });
        setButtonStyles({
          ...response.data.button,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, []);

  useEffect(() => {
    if (reRender) {
      console.log(site.ref);
      siteClient
        .query(
          q.Let(
            {
              styles: q.Get(q.Match(q.Index('styles_by_site'), site.ref)),
            },
            q.Var('styles')
          )
        )
        .then((response) => {
          console.log(response);
          setStylesID(response.ref.value.id);
          setColors({
            ...response.data.color,
          });
          setLabelStyles({
            ...response.data.label,
          });
          setInputStyles({
            ...response.data.input,
          });
          setButtonStyles({
            ...response.data.button,
          });

          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });

      setRender(false);
    }
  }, [reRender]);

  const updateStyles = () => {
    siteClient
      .query(
        q.Update(q.Ref(q.Collection('styles'), stylesID), {
          data: {
            color: colors,
            label: labelStyles,
            input: inputStyles,
            button: buttonStyles,
          },
        })
      )
      .then((faunaResponse) => {
        console.log(faunaResponse);
        setCustomizeModalOpen(false);
        setNotificationMessage('Success!');
        setNotificationType('success');
      })
      .catch((faunaError) => console.log(faunaError));
  };

  return (
    <Modal
      toggleFunction={() => setCustomizeModalOpen(false)}
      title='Customize Form'
      full
      noHeader
    >
      <DelayedLoad
        condition={!loading}
        delay={1000}
        fail={<h1>We can't access your form right now.</h1>}
        render={
          <div
            style={{ position: 'relative' }}
            className='pt-none mt-none pb-6'
          >
            <h2 className='mb-3 mt-none'>Customize Form</h2>
            <p className='m-none mb-5'>
              Hover over each element in the preview to customize it.
            </p>
            <Row
              customStyles='height: 100%;'
              spacing={[24, 0]}
              breakpoints={[769]}
            >
              <Sidebar widths={[4]}>
                <Accordion>
                  <SidebarItem label='Colors'>
                    <Spacer height={12} />
                    <Label>Primary</Label>
                    <input
                      onChange={(e) =>
                        setColors({
                          ...colors,
                          primary: e.target.value,
                        })
                      }
                      className='mb-3'
                      type='color'
                      name=''
                      id=''
                    />
                    <Label>Secondary</Label>
                    <input
                      onChange={(e) =>
                        setColors({
                          ...colors,
                          secondary: e.target.value,
                        })
                      }
                      className='mb-3'
                      type='color'
                      name=''
                      id=''
                    />
                    <Label>Text</Label>
                    <input
                      onChange={(e) =>
                        setColors({
                          ...colors,
                          text: e.target.value,
                        })
                      }
                      className='mb-3'
                      type='color'
                      name=''
                      id=''
                    />
                    <Spacer height={12} />
                  </SidebarItem>
                  <SidebarItem label='Form Labels'>
                    <Spacer height={12} />
                    <Label>Font Size</Label>
                    <SmallInput
                      onChange={(e) =>
                        setLabelStyles({
                          ...labelStyles,
                          fontSize: e.target.value,
                        })
                      }
                      type='number'
                      name=''
                      id=''
                      className='mb-4'
                      value={labelStyles.fontSize}
                    />
                    <Label>Custom CSS</Label>
                    <CodeWrapper>
                      <p>input {'{'}</p>
                      <Editor
                        value={labelStyles.customCSS}
                        onValueChange={(code) =>
                          setLabelStyles({
                            ...labelStyles,
                            customCSS: code,
                          })
                        }
                        highlight={(code) => highlight(code, languages.css)}
                        padding={10}
                        style={{
                          fontFamily: '"Fira code", "Fira Mono", monospace',
                          minHeight: '100px',
                          background: '#ffffff',
                          margin: '6px 0 0 2px',
                          outline: 'none',
                        }}
                      />
                      <p>{'}'}</p>
                    </CodeWrapper>

                    <Spacer height={12} />
                  </SidebarItem>
                  <SidebarItem label='Input'>
                    <Spacer height={12} />
                    <Label>
                      <strong>Font Size</strong>
                    </Label>
                    <SmallInput
                      onChange={(e) =>
                        setInputStyles({
                          ...inputStyles,
                          fontSize: e.target.value,
                        })
                      }
                      style={{ width: 60 }}
                      className='mb-4'
                      type='number'
                      name=''
                      id=''
                      value={inputStyles.fontSize}
                    />
                    <Label>
                      <strong>Padding</strong>
                    </Label>
                    <div className='mb-4'>
                      {' '}
                      <Row breakpoints={[576]} spacing={[6, 0]}>
                        <div widths={[6]}>
                          <small>Vertical</small>
                          <SmallInput
                            style={{ width: '100%' }}
                            type='number'
                            name=''
                            placeholder='Vertical'
                            id=''
                            value={inputStyles.paddingY}
                            onChange={(e) => {
                              setInputStyles({
                                ...inputStyles,
                                paddingY: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div widths={[6]}>
                          <small>Horizontal</small>
                          <SmallInput
                            style={{ width: '100%' }}
                            type='number'
                            name=''
                            placeholder='Horizontal'
                            id=''
                            value={inputStyles.paddingX}
                            onChange={(e) => {
                              setInputStyles({
                                ...inputStyles,
                                paddingX: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </Row>
                    </div>
                    <Label>Custom CSS</Label>
                    <CodeWrapper>
                      <p>input {'{'}</p>
                      <Editor
                        value={inputStyles.customCSS}
                        onValueChange={(code) =>
                          setInputStyles({
                            ...inputStyles,
                            customCSS: code,
                          })
                        }
                        highlight={(code) => highlight(code, languages.css)}
                        padding={10}
                        style={{
                          fontFamily: '"Fira code", "Fira Mono", monospace',
                          minHeight: '100px',
                          background: '#ffffff',
                          margin: '6px 0 0 2px',
                          outline: 'none',
                        }}
                      />
                      <p>{'}'}</p>
                    </CodeWrapper>
                    <Spacer height={12} />
                  </SidebarItem>
                  <SidebarItem label='Button'>
                    <Spacer height={12} />
                    <Label>Custom CSS</Label>
                    <CodeWrapper>
                      <p>input {'{'}</p>
                      <Editor
                        value={buttonStyles.customCSS}
                        onValueChange={(code) =>
                          setButtonStyles({
                            ...buttonStyles,
                            customCSS: code,
                          })
                        }
                        highlight={(code) => highlight(code, languages.css)}
                        padding={10}
                        style={{
                          fontFamily: '"Fira code", "Fira Mono", monospace',
                          minHeight: '100px',
                          background: '#ffffff',
                          margin: '6px 0 0 2px',
                          outline: 'none',
                        }}
                      />
                      <p>{'}'}</p>
                    </CodeWrapper>
                  </SidebarItem>
                </Accordion>
                <Button color='primary' onClick={updateStyles}>
                  Save
                </Button>
              </Sidebar>
              <Preview widths={[8]}>
                <h2 className='m-none'>Connect with us!</h2>
                <Line color={colors.primary} className='my-4' />
                <Row spacing={[24, 12]} breakpoints={[769]}>
                  <div widths={[6]}>
                    <Label
                      customCSS={labelStyles.customCSS}
                      fontSize={labelStyles.fontSize}
                    >
                      Name
                    </Label>
                    <Input
                      customCSS={inputStyles.customCSS}
                      fontSize={inputStyles.fontSize}
                      color={colors.primary}
                      placeholder='Name'
                      padding={{
                        vertical: inputStyles.paddingY,
                        horizontal: inputStyles.paddingX,
                      }}
                    />
                  </div>
                  <div widths={[6]}>
                    <Label
                      customCSS={labelStyles.customCSS}
                      fontSize={labelStyles.fontSize}
                    >
                      Email
                    </Label>
                    <Input
                      customCSS={inputStyles.customCSS}
                      fontSize={inputStyles.fontSize}
                      color={colors.primary}
                      placeholder='Email'
                      padding={{
                        vertical: inputStyles.paddingY,
                        horizontal: inputStyles.paddingX,
                      }}
                    />
                  </div>
                  <div widths={[12]}>
                    <Label
                      customCSS={labelStyles.customCSS}
                      fontSize={labelStyles.fontSize}
                    >
                      Comment
                    </Label>
                    <Textarea
                      customCSS={inputStyles.customCSS}
                      fontSize={inputStyles.fontSize}
                      color={colors.primary}
                      padding={{
                        vertical: inputStyles.paddingY,
                        horizontal: inputStyles.paddingX,
                      }}
                    ></Textarea>
                  </div>
                  <div widths={[12]}>
                    <StyledButton
                      customCSS={buttonStyles.customCSS}
                      background={colors.primary}
                    >
                      Comment
                    </StyledButton>
                  </div>
                </Row>
              </Preview>
            </Row>
          </div>
        }
      />
    </Modal>
  );
};

const Loading = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${(props) => props.theme.color.gray.one};
`;

const CodeWrapper = styled.div`
  background: ${(props) => props.theme.color.gray.one};
  border-radius: ${(props) => props.theme.radius.one};
  border: 1px solid ${(props) => props.theme.color.gray.three};
  outline: none;
  padding: 12px;
  p {
    margin: 0 !important;
  }
  textarea {
    outline: none !important;
  }
`;

const Sidebar = styled.div`
  border-right: 1px solid #e8e8e8;
  border-left: 1px solid #e8e8e8;
  border-top: 1px solid #e8e8e8;
  height: 100%;
`;

const SidebarItem = styled.div`
  width: 100%;
  padding: 18px 16px;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
  :hover {
    background: #f7f7f7;
  }
`;

const Preview = styled.div`
  height: 100%;
`;

const Line = styled.div`
  height: 2px;
  background: ${(props) => props.color};
  width: 90px;
`;

const Label = styled.label`
  margin-bottom: 8px;
  display: block;
  font-size: ${(props) => props.fontSize}px !important;
  ${(props) =>
    props.customCSS &&
    css`
      ${props.customCSS}
    `}
`;

const Input = styled.input`
  padding-top: ${(props) => props.padding.vertical}px;
  padding-right: ${(props) => props.padding.horizontal}px;
  padding-left: ${(props) => props.padding.horizontal}px;
  padding-bottom: ${(props) => props.padding.vertical}px;
  margin: 0;
  width: 100%;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  :focus {
    outline: 1px ${(props) => props.color} auto;
  }
  font-size: ${(props) => props.fontSize}px !important;
  ${(props) =>
    props.customCSS &&
    css`
      ${props.customCSS}
    `}
`;

const Textarea = styled.textarea`
  padding-top: ${(props) => props.padding.vertical}px;
  padding-right: ${(props) => props.padding.horizontal}px;
  padding-left: ${(props) => props.padding.horizontal}px;
  padding-bottom: ${(props) => props.padding.vertical}px;
  width: 100%;
  font-size: ${(props) => props.fontSize}px !important;
  margin: 0;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  min-height: 200px;
  :focus {
    outline: 1px ${(props) => props.color} auto;
  }
  ${(props) =>
    props.customCSS &&
    css`
      ${props.customCSS}
    `}
`;

const StyledButton = styled.button`
  padding: 12px;
  background: ${(props) => props.background};
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  margin-left: auto;
  ${(props) =>
    props.customCSS &&
    css`
      ${props.customCSS}
    `}
`;

const SmallInput = styled.input`
  padding: 4px 10px;
  margin: 0;
  width: fit-content;
  display: inline-block;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  height: 31px;
  :focus {
    outline: 1px ${(props) => props.color} auto;
  }
`;

const SmallSelect = styled.select`
  padding-left: 6px;
  padding-bottom: 4px;
  height: 31px;
  margin-left: 6px;
  width: fit-content;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  display: inline-block;
  position: relative;
  top: -2px;
  :focus {
    outline: 1px ${(props) => props.color} auto;
  }
`;

export default CustomizeModal;
