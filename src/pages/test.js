import React, { useContext, useState } from 'react';
import { DatabaseContext } from '../providers/DatabaseProvider';
import Button from '../components/Button';
import Section from '../components/layout/Section';
import Spacer from '../components/Spacer';
import faunadb, { query as q } from 'faunadb';

const Test = () => {
  const { state, serverClient } = useContext(DatabaseContext);
  const [user, setUser] = useState(null);

  const faunaClient = new faunadb.Client({
    secret: 'fnEDsPd7yHACEwOrb15ToAITMdtddv9DYhwmOr-nxiXDAzQzFm0',
  });

  const getSites = () => {
    faunaClient
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index('all_sites'))),
          q.Lambda(
            'siteRef',
            q.Let(
              {
                site: q.Get(q.Var('siteRef')),
              },
              {
                ref: q.Select(['ref'], q.Var('site')),
                data: q.Select(['data'], q.Var('site')),
                raw: q.Var('site'),
              }
            )
          )
        )
        // q.Get(q.Match(q.Index('all_users')))
      )
      .then((res) => {
        setUser(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const getSiteById = () => {
    faunaClient
      .query(
        // q.Map(
        //   q.Paginate(q.Match(q.Index('site_by_id'), 'ja')),
        //   q.Lambda(
        //     'siteRef',
        //     q.Let(
        //       {
        //         site: q.Get(q.Var('siteRef')),
        //       },
        //       {
        //         ref: q.Select(['ref'], q.Var('site')),
        //         data: q.Select(['data'], q.Var('site')),
        //         raw: q.Var('site'),
        //       }
        //     )
        //   )
        // )
        q.Get(q.Match(q.Index('site_by_id'), 'makennas-site'))
      )
      .then((res) => {
        setUser(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const updateSite = () => {
    faunaClient
      .query(
        q.Update(q.Ref(q.Collection('sites'), '265984318236525075'), {
          data: {
            name: "Jarod's Site",
            id: 'jarods-site',
          },
        })
        // q.Let(
        //   {
        //     site: q.Get(q.Match(q.Index('site_by_id'), 'site')),
        //     userRef: q.Select(['data', 'user'], q.Var('site')),
        //     // userRef: q.Ref(q.Collection('users'), q.Var('user')),
        //     identityRef: q.Identity(),
        //   },
        //   {
        //     isAllowed: q.Equals(q.Var('userRef'), q.Var('identityRef')),
        //   }
        // )
      )
      .then((faunaResponse) => {
        console.log(faunaResponse);

        // faunaClient.query(q.Identity()).then((resTwo) => {
        //   console.log(resTwo + 'and' + faunaResponse);
        // });
      })
      .catch((faunaError) => console.log(faunaError));
  };

  const deleteSite = () => {
    faunaClient
      .query(
        // q.Map(
        //   q.Paginate(q.Match(q.Index('site_by_id'), 'ja')),
        //   q.Lambda(
        //     'siteRef',
        //     q.Let(
        //       {
        //         site: q.Get(q.Var('siteRef')),
        //       },
        //       {
        //         ref: q.Select(['ref'], q.Var('site')),
        //         data: q.Select(['data'], q.Var('site')),
        //         raw: q.Var('site'),
        //       }
        //     )
        //   )
        // )
        q.Let(
          {
            site: q.Get(q.Match(q.Index('site_by_id'), 'staticbox')),
            ref: q.Select('ref', q.Var('site')),
          },
          q.Delete(q.Var('ref'))
          // {
          //   site: q.Var('site'),
          //   ref: q.Var('ref'),
          // }
        )
      )
      .then((res) => {
        setUser(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Section>
      <Button onClick={() => getSites()}>Get All Sites</Button>
      <Spacer height={17} />
      <Button onClick={() => getSiteById()}>Get Site By ID</Button>
      <Spacer height={17} />
      <Button onClick={() => updateSite()}>Update Site</Button>
      <Spacer height={17} />
      <Button onClick={() => deleteSite()}>Delete Site</Button>
    </Section>
  );
};

export default Test;
