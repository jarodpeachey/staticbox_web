import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Modal from '../Modal';
import Spacer from '../Spacer';
import Button from '../Button';
import { AppContext } from '../../providers/AppProvider';
import { FirebaseContext } from '../../providers/FirebaseProvider';
// import { AuthContext } from '../../providers/DatabaseProvider';
import { isBrowser } from '../../utils/isBrowser';
import Loader from '../Loader';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import { formatSiteId } from '../../utils/formatSiteId';
import Row from '../grid/Row';
import Accordion from '../Accordion';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';

const CustomizeModal = () => {
  const [primaryColor, setPrimaryColor] = useState('#fbbe76');
  const [secondaryColor, setSecondaryColor] = useState('#aacd67');
  const [labelFontSize, setLabelFontSize] = useState(16);
  const [inputFontSize, setInputFontSize] = useState(16);
  const [inputPadding, setInputPadding] = useState({
    vertical: 0,
    horizontal: 0,
  });
  const [customLabelCSS, setCustomLabelCSS] = useState('');
  const [customInputCSS, setCustomInputCSS] = useState('');
  const [customButtonCSS, setCustomButtonCSS] = useState('');

  const {
    setCustomizeModalOpen,
    setNotificationMessage,
    setNotificationType,
  } = useContext(AppContext);

  const theme = useContext(ThemeContext);

  return (
    <Modal
      toggleFunction={() => setCustomizeModalOpen(false)}
      title='Customize Form'
      full
      noHeader
    >
      <div className='pt-none mt-none pb-6'>
        <h2 className='mb-3 mt-none'>Customize Form</h2>
        <p className='m-none mb-5'>
          Hover over each element in the preview to customize it.
        </p>
        <Row customStyles='height: 100%;' spacing={[24, 0]} breakpoints={[769]}>
          <Sidebar widths={[4]}>
            <Accordion>
              <SidebarItem label='Colors'>
                <Spacer height={12} />
                <Label>Primary</Label>
                <input
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className='mb-3'
                  type='color'
                  name=''
                  id=''
                />
                <Label>Secondary</Label>
                <input
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className='mb-3'
                  type='color'
                  name=''
                  id=''
                />
                <Label>Text</Label>
                <input
                  onChange={(e) => setSecondaryColor(e.target.value)}
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
                  onChange={(e) => setLabelFontSize(e.target.value)}
                  type='number'
                  name=''
                  id=''
                  className='mb-4'
                />
                <Label>Custom CSS</Label>
                <CodeWrapper>
                  <p>input {`{`}</p>
                  <Editor
                    value={customLabelCSS}
                    onValueChange={(code) => setCustomLabelCSS(code)}
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
                  <p>{`}`}</p>
                </CodeWrapper>

                <Spacer height={12} />
              </SidebarItem>
              <SidebarItem label='Input'>
                <Spacer height={12} />
                <Label>
                  <strong>Font Size</strong>
                </Label>
                <SmallInput
                  onChange={(e) => setInputFontSize(e.target.value)}
                  style={{ width: 60 }}
                  className='mb-4'
                  type='number'
                  name=''
                  id=''
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
                        onChange={(e) => {
                          setInputPadding({
                            ...inputPadding,
                            vertical: e.target.value,
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
                        onChange={(e) => {
                          setInputPadding({
                            ...inputPadding,
                            horizontal: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Row>
                </div>
                <Label>Custom CSS</Label>
                <CodeWrapper>
                  <p>input {`{`}</p>
                  <Editor
                    value={customLabelCSS}
                    onValueChange={(code) => setCustomInputCSS(code)}
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
                  <p>{`}`}</p>
                </CodeWrapper>
                <Spacer height={12} />
              </SidebarItem>
              <SidebarItem label='Button'>
                <Spacer height={12} />
                <Label>Custom CSS</Label>
                <CodeWrapper>
                  <p>input {`{`}</p>
                  <Editor
                    value={customLabelCSS}
                    onValueChange={(code) => setCustomButtonCSS(code)}
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
                  <p>{`}`}</p>
                </CodeWrapper>
              </SidebarItem>
            </Accordion>
          </Sidebar>
          <Preview widths={[8]}>
            <h2 className='m-none'>Connect with us!</h2>
            <Line color={primaryColor} className='my-4' />
            <Row spacing={[24, 12]} breakpoints={[769]}>
              <div widths={[6]}>
                <Label fontSize={labelFontSize}>Name</Label>
                <Input
                  fontSize={inputFontSize}
                  color={primaryColor}
                  placeholder='Name'
                  padding={inputPadding}
                />
              </div>
              <div widths={[6]}>
                <Label fontSize={labelFontSize}>Email</Label>
                <Input
                  fontSize={inputFontSize}
                  color={primaryColor}
                  placeholder='Email'
                  padding={inputPadding}
                />
              </div>
              <div widths={[12]}>
                <Label fontSize={labelFontSize}>Comment</Label>
                <Textarea
                  fontSize={inputFontSize}
                  color={primaryColor}
                  padding={inputPadding}
                ></Textarea>
              </div>
              <div widths={[12]}>
                <StyledButton background={primaryColor}>Comment</StyledButton>
              </div>
            </Row>
          </Preview>
        </Row>
      </div>
    </Modal>
  );
};

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
`;

const StyledButton = styled.button`
  padding: 12px;
  background: ${(props) => props.background};
  color: white;
  border: none;
  outline: none;
  border-radius: 5px;
  margin-left: auto;
`;

export default CustomizeModal;
