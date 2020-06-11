// src/pages/SiteDashboard.js
import React, { useContext, useEffect, useState } from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import Card from '../Card';
import Button from '../Button';
import Spacer from '../Spacer';
import Loader from '../Loader';
import DelayedLoad from '../DelayedLoad';
import EditPersonalInfoModal from './EditUserInfoModal';
import { AppContext } from '../../providers/AppProvider';
import { FirebaseContext } from '../../providers/FirebaseProvider';
import { isBrowser } from '../../utils/isBrowser';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import Row from '../grid/Row';
import { formatSiteId } from '../../utils/formatSiteId';
import { shortenText } from '../../utils/shortenText';

const SiteDashboard = () => {
  const { setEditSiteInfoModalOpen } = useContext(AppContext);
  const { firebase, firebaseUser } = useContext(FirebaseContext);
  const [reRender, setRender] = useState(false);
  const { state, q } = useContext(DatabaseContext);
  const { user, site, siteClient } = state;

  const [comments, setComments] = useState([]);
  const [commentsToShow, setCommentsToShow] = useState(comments);
  const loadedComments = [];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loadedComments && loadedComments.length > 0) {
      // setComments(loadedComments);
    } else {
      setLoading(true);
      siteClient
        .query(
          q.Map(
            q.Paginate(q.Match(q.Index('all_comments')), { size: 3 }),
            q.Lambda(
              'commentsRef',
              q.Let(
                {
                  comments: q.Get(q.Var('commentsRef')),
                  user: q.Get(q.Select(['data', 'user'], q.Var('comments'))),
                  site: q.Get(q.Select(['data', 'site'], q.Var('comments'))),
                },
                {
                  ref: q.Select(['ref'], q.Var('comments')),
                  data: q.Select(['data'], q.Var('comments')),
                }
              )
            )
          )
        )
        .then((response) => {
          setComments(response.data);
          setCommentsToShow(response.data);
          const dataToDelete = [];
          setTimeout(() => {
            setLoading(false);
          }, 500);

          response.data.map((newData) =>
            dataToDelete.push(newData.ref.value.id)
          );

          // siteClient
          //   .query(
          //     q.Map(
          //       dataToDelete,
          //       q.Lambda(
          //         'data',
          //         q.Delete(
          //           q.Ref(
          //             q.Collection('comments'),
          //             // q.Select(
          //             //   ['id'],
          //             q.Var('data')
          //             // )
          //           )
          //         )
          //       )
          //     )
          //   )
          //   .then((responseTwo) => {
          //     console.log(responseTwo);
          //     setRender(true);
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
        })
        .catch((error) => {
          console.log(error);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    }
  }, []);

  const openEditModal = () => {
    setEditSiteInfoModalOpen(true);
  };

  return (
    // <DelayedLoad>
    <span>
      {/* <h2 className='mt-none'>Account Info</h2> */}
      <Row spacing={[16]} breakpoints={[769]}>
        <div widths={[6]}>
          {/* <Card title='Account'>
            <p className='small m-none'>
              Name: {user.data.name || 'Guest'}
            </p>
            <p className='small m-none'>Email: {user.data.email}</p>
            <Spacer />
            <Button onClick={() => openEditModal(true)} size="small">
              Edit
            </Button>
          </Card> */}
          <Card title='Details'>
            <p className='small m-none'>Name: {site.data.name || 'Guest'}</p>
            <Spacer />
            <Button onClick={() => openEditModal()} size='small'>
              Edit
            </Button>
          </Card>
        </div>
        <div widths={[6]}>
          <Card title='Latest Comments'>
            {comments.map((comment) => {
              return (
                <CommentWrapper>
                  <Comment>{shortenText(comment.data.comment, 100)}</Comment>
                  <CommentName className='m-none'>
                    - {comment.data.name} on page {comment.data.path}
                  </CommentName>
                </CommentWrapper>
              );
            })}
            <Spacer />
            <Button
              link={`/sites/${formatSiteId(site.data.name)}/comments`}
              size='small'
            >
              More
            </Button>
          </Card>
        </div>
      </Row>
    </span>
  );
};

const CommentWrapper = styled.div`
  border-radius: 5px;
  margin: 16px 0;
`;

const Comment = styled.p`
  margin: 0;
`;

const CommentName = styled.small``;

const animation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const SlideWrapper = styled.div`
  animation: ${animation} 250ms ease-out;
`;

export default SiteDashboard;
