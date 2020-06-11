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

const DeleteUserModal = () => {
  const { firebase, firebaseUser } = useContext(FirebaseContext);
  const { q, serverClient, faunaUser, state, dispatch } = useContext(
    DatabaseContext
  );
  const { userClient, user, site } = state;

  // const [stateName, setStateName] = useState('');
  const [loading, setLoading] = useState(false);
  // const [disabled, setDisabled] = useState(true);

  const {
    setDeleteUserModalOpen,
    setNotificationMessage,
    setNotificationType,
    setPasswordModalOpen,
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

    firebase
      .auth()
      .currentUser.delete()
      .then((resTwo) => {
        console.log('Success! ', resTwo);

        userClient
          .query(
            q.Map(
              q.Paginate(q.Match(q.Index('all_sites'))),
              q.Lambda(
                'sitesRef',
                q.Let(
                  {
                    site:
                      // q.Var('sitesRef')

                      q.Delete(
                        q.Ref(
                          q.Collection('sites'),

                          q.Select('id', q.Var('sitesRef'))
                        )
                      ),
                    user: q.Delete(
                      q.Ref(
                        q.Collection('users'),
                        // q.Select(
                        user.ref.value.id
                        // )
                      )
                    ),
                  },
                  {
                    user: q.Var('user'),
                    site: q.Var('site'),
                  }
                )
              )
            )
          )
          .then((res) => {
            console.log(res);
            dispatch({ type: 'deleteUser', data: {} });
            setDeleteUserModalOpen(false);
            setNotificationMessage('Account deleted.');
            setNotificationType('success');
          })
          .catch((err) => console.log(err));
      })
      .catch((errTwo) => {
        console.log('Error: ', errTwo);
        if (errTwo.code === 'auth/requires-recent-login') {
          setPasswordModalOpen(true);
          setDeleteUserModalOpen(false);
        } else {
          setDeleteUserModalOpen(false);
          setNotificationMessage('Something went wrong.');
          setNotificationType('error');
        }
      });
  };

  return (
    <Modal
      toggleFunction={() => setDeleteUserModalOpen(false)}
      title='Delete Account'
    >
      <strong>Deleting your account will remove all your data.</strong>
      <p> Are you sure you want to continue?</p>
      {/* <Input onChange={onNameChange} value={stateName} /> */}
      <Spacer height={16} />
      <Button onClick={updateName} color='error' size='small' className='right'>
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

export default DeleteUserModal;
