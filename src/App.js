import React from 'react';
// import logo from './logo.svg';
import './App.css';

import { Gitgraph, templateExtend, TemplateName } from '@gitgraph/react';

const gitFlow = (gitgraph) => {
  // Simulate git commands with Gitgraph API.
  const master = gitgraph.branch('master');
  master.commit('Initial commit');

  const develop = gitgraph.branch('develop');
  develop.commit('Add TypeScript');

  const aFeature = gitgraph.branch('feature a');
  aFeature.commit().commit();

  develop.commit('Add TypeScript');

  const bFeature = gitgraph.branch('feature b');
  bFeature.commit().commit();

  develop.merge(aFeature);
  develop.merge(bFeature);

  master.merge(develop).tag('v1.0.0');
};

const trunkBased = (gitgraph) => {
  // Simulate git commands with Gitgraph API.
  // Release branches are optional for TBD
  const releaseBranches = false;
  const branchColor = '#f1c109';

  let master;
  if (releaseBranches) {
    master = gitgraph.branch('master').commit();
  } else {
    master = gitgraph
      .branch({
        name: 'master',
        style: {
          color: branchColor,
          label: { color: branchColor, strokeColor: branchColor },
        },
      })
      .commit({ style: { dot: { color: branchColor } } });
  }

  let r1;
  if (releaseBranches)
    r1 = gitgraph.branch({ name: 'release 1', from: master });

  if (releaseBranches) {
    master.commit().commit().commit().commit();
    r1.commit().tag('v1.0.0');
  } else {
    master
      .commit({ style: { dot: { color: branchColor } } })
      .commit({ style: { dot: { color: branchColor } } })
      .commit({ style: { dot: { color: branchColor } } })
      .commit({ style: { dot: { color: branchColor } } });
  }

  let r2;
  if (releaseBranches)
    r2 = gitgraph.branch({ name: 'release 2', from: master });

  if (releaseBranches) {
    master.commit().commit().commit();
    r2.commit().tag('v1.1.0');
  } else {
    master
      .commit({ style: { dot: { color: branchColor } } })
      .commit({ style: { dot: { color: branchColor } } })
      .commit({ style: { dot: { color: branchColor } } });
  }
};

const trunkBasedScaled = (gitgraph) => {
  // Simulate git commands with Gitgraph API.
  const master = gitgraph.branch('master').commit();

  const aFeature = gitgraph
    .branch({ name: 'feature a', from: master })
    .commit();
  const r1 = gitgraph.branch({ name: 'release 1', from: master });

  aFeature.commit();

  aFeature.commit();
  master.commit();

  const bFeature = gitgraph.branch({ name: 'feature b', from: master });
  master.merge(aFeature);
  r1.commit().tag('v1.0.0');
  bFeature.commit();

  bFeature.commit();

  bFeature.commit();
  const r2 = gitgraph.branch({ name: 'release 2', from: master });

  master.merge(bFeature);
  r2.commit().tag('v1.1.0');
};

function App() {
  var branchesOrder = [
    'release 2',
    'release 1',
    'master',
    'develop',
    'feature a',
    'feature b',
  ];
  const options = {
    template: templateExtend(TemplateName.Metro, {
      branch: {
        // Transparent label backgrounds
        // label: {
        //   bgColor: 'rgb(0,0,0,0)',
        // },
        spacing: 70,
      },
      // Set the color of all dots manually
      // commit: { dot: { color: '#f1c109' } },
    }),
    compareBranchesOrder: (a, b) => {
      return branchesOrder.indexOf(a) - branchesOrder.indexOf(b);
    },
    mode: 'compact',
    orientation: 'horizontal',
  };

  return (
    <div className='App'>
      <h1>GitFlow</h1>
      <Gitgraph options={options}>{gitFlow}</Gitgraph>
      <h1>Trunk-Based Development For Smaller Teams</h1>
      <Gitgraph options={options}>{trunkBased}</Gitgraph>
      <h1>Scaled Trunk-Based Development</h1>
      <Gitgraph options={options}>{trunkBasedScaled}</Gitgraph>
    </div>
  );
}

export default App;
