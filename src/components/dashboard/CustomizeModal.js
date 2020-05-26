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

const CustomizeModal = () => {
  const { firebase, firebaseUser } = useContext(FirebaseContext);
  const { q, serverClient, faunaUser, state, dispatch } = useContext(
    DatabaseContext
  );
  const { siteClient, user, site } = state;

  // const [stateName, setStateName] = useState('');
  const [loading, setLoading] = useState(false);
  // const [disabled, setDisabled] = useState(true);

  const {
    setCustomizeModalOpen,
    setNotificationMessage,
    setNotificationType,
  } = useContext(AppContext);

  // const onNameChange = (e) => {
  //   setStateName(e.target.value);

  //   if (e.target.value !== site.data.name) {
  //   } else {
  //     setDisabled(false);
  //   }
  // };

  console.log(site);

  const updateName = () => {
    setLoading(true);

    siteClient
      .query(
        // q.Map(
        //   q.Paginate(q.Match(q.Index('all_keys'))),
        //   q.Lambda(
        //     'keysRef',
        q.Delete(
          q.Ref(
            q.Collection('sites'),
            // q.Select(
            site.ref.value.id
            // )
          )
        )
        //   )
        // )
      )
      .then((res) => {
        console.log(res);
        dispatch({ type: 'deleteSite', data: {} });
        setCustomizeModalOpen(false);
        setNotificationMessage('Site deleted.');
        setNotificationType('success');
      })
      .catch((err) => console.log(err));
  };

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
          <Sidebar widths={[3]}>
            <SidebarItem>Colors</SidebarItem>
            <SidebarItem>Input</SidebarItem>
            <SidebarItem>Button</SidebarItem>
            <SidebarItem>Colors</SidebarItem>
          </Sidebar>
          <Preview widths={[9]}>
            <h2 className='m-none'>Connect with us!</h2>
            <Line className='my-4' />
            <Row spacing={[24, 12]} breakpoints={[769]}>
              <div widths={[6]}>
                <Label>Name</Label>
                <Input placeholder='Name' />
              </div>
              <div widths={[6]}>
                <Label>Email</Label>
                <Input placeholder='Email' />
              </div>
              <div widths={[12]}>
                <Label>Comment</Label>
                <Textarea></Textarea>
              </div>
              <div widths={[12]}>
                <StyledButton>Comment</StyledButton>
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
  background: tomato;
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
`;

const Textarea = styled.textarea`
  padding: 16px;
  width: 100%;
  margin: 0;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  min-height: 200px;
`;

const StyledButton = styled.button`
  padding: 12px;
  background: tomato;
  color: white;
  border: none;
  border-radius: 5px;
  margin-left: auto;
`;

export default CustomizeModal;
