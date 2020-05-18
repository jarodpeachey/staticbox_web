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

const DeleteSiteModal = () => {
  const { firebase, firebaseUser } = useContext(FirebaseContext);
  const { q, serverClient, faunaUser, state, dispatch } = useContext(
    DatabaseContext
  );
  const { siteClient, user, site } = state;

  // const [stateName, setStateName] = useState('');
  const [loading, setLoading] = useState(false);
  // const [disabled, setDisabled] = useState(true);

  const {
    setDeleteSiteModalOpen,
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
        setDeleteSiteModalOpen(false);
        setNotificationMessage('Site deleted.');
        setNotificationType('success');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      toggleFunction={() => setDeleteSiteModalOpen(false)}
      title='Delete Site'
    >
      <strong>Deleting your site will remove all your data.</strong>
      <p> Are you sure you want to continue?</p>
      {/* <Input onChange={onNameChange} value={stateName} /> */}
      <Spacer height={16} />
      <Button onClick={updateName} right small error>
        {loading ? (
          <span>
            <HiddenText>Delete</HiddenText>
            <Loader size={20} absolute color='#ffffff' />
          </span>
        ) : (
          'Delete'
        )}
      </Button>
    </Modal>
  );
};

const HiddenText = styled.span`
  color: transparent;
  opacity: 0;
  visibility: hidden;
`;

const Input = styled.input`
  margin: 0;
  padding: 13px 13px;
  margin-bottom: 16px;
  background: #f7f7f7;
  border-radius: 5px;
  width: 100%;
  border: none;
  border: 1.5px solid transparent;
  outline: none;
  :focus {
    border: 1.5px solid rgb(25, 48, 92);
  }
`;

export default DeleteSiteModal;
