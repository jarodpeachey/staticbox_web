import React, { useState, useContext } from 'react';
import styled from 'styled-components';
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

const CustomizeModal = () => {
  const [primaryColor, setPrimaryColor] = useState('#fbbe76');
  const [secondaryColor, setSecondaryColor] = useState('#aacd67');

  const {
    setCustomizeModalOpen,
    setNotificationMessage,
    setNotificationType,
  } = useContext(AppContext);

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
        <Row
          customStyles={`height: 100%;`}
          spacing={[24, 0]}
          breakpoints={[769]}
        >
          <Sidebar widths={[4]}>
            <Accordion>
              <SidebarItem label='Colors'>
                <Spacer height={12} />
                <Label>Primary</Label>
                <SmallInput
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className='mb-3'
                  type='color'
                  name=''
                  id=''
                />
                <Label>Secondary</Label>
                <SmallInput
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className='mb-3'
                  type='color'
                  name=''
                  id=''
                />
                <Label>Text</Label>
                <SmallInput
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
                <SmallInput type='number' name='' id='' />
                <SmallSelect>
                  <option>px</option>
                  <option>em</option>
                  <option>rem</option>
                </SmallSelect>
                <Spacer height={12} />
              </SidebarItem>
              <SidebarItem label='Input'>
                <Spacer height={12} />
                <Label>
                  <strong>Font Size</strong>
                </Label>
                <SmallInput
                  style={{ width: 60 }}
                  className='mb-3'
                  type='number'
                  name=''
                  id=''
                />
                <SmallSelect>
                  <option>px</option>
                  <option>em</option>
                  <option>rem</option>
                </SmallSelect>
                <Label>
                  <strong>Margin</strong>
                </Label>
                <Row breakpoints={[576]} spacing={[6, 0]}>
                  <div widths={[3]}>
                    <small>Top</small>
                    <br />
                    <SmallInput
                      style={{ width: '100%' }}
                      type='number'
                      name=''
                      placeholder='Top'
                      id=''
                    />
                  </div>
                  <div widths={[3]}>
                    <small>Left</small>
                    <br />
                    <SmallInput
                      style={{ width: '100%' }}
                      type='number'
                      name=''
                      placeholder='Left'
                      id=''
                    />
                  </div>
                  <div widths={[3]}>
                    <small>Bottom</small>
                    <br />
                    <SmallInput
                      style={{ width: '100%' }}
                      type='number'
                      name=''
                      placeholder='Bottom'
                      id=''
                    />
                  </div>
                  <div widths={[3]}>
                    <small>Right</small>
                    <br />
                    <SmallInput
                      style={{ width: '100%' }}
                      type='number'
                      name=''
                      placeholder='Right'
                      id=''
                    />
                  </div>
                </Row>
                <Spacer height={12} />
              </SidebarItem>
              <SidebarItem label='Button'>Button</SidebarItem>
            </Accordion>
          </Sidebar>
          <Preview widths={[8]}>
            <h2 className='m-none'>Connect with us!</h2>
            <Line color={primaryColor} className='my-4' />
            <Row spacing={[24, 12]} breakpoints={[769]}>
              <div widths={[6]}>
                <Label>Name</Label>
                <Input color={primaryColor} placeholder='Name' />
              </div>
              <div widths={[6]}>
                <Label>Email</Label>
                <Input color={primaryColor} placeholder='Email' />
              </div>
              <div widths={[12]}>
                <Label>Comment</Label>
                <Textarea color={primaryColor}></Textarea>
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
`;

const Input = styled.input`
  padding: 16px;
  margin: 0;
  width: 100%;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  :focus {
    outline: 1px ${(props) => props.color} auto;
  }
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
  padding: 16px;
  width: 100%;
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
