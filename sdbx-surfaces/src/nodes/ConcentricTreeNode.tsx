import React, { useState } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { GradientDarkgreenGreen, GradientLightgreenGreen, GradientOrangeRed, GradientPinkBlue, GradientPinkRed, GradientPurpleOrange, GradientPurpleTeal, GradientSteelPurple, GradientTealBlue, LinearGradient, RadialGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import useForceUpdate from './useForceUpdate';
import LinkControls from './LinkControls';
import getLinkComponent from './getLinkComponent';

interface TreeNode {
  name: string;
  isExpanded?: boolean;
  children?: TreeNode[];
  terminal?: boolean;
}

const data: TreeNode = {
  name: 'SERVER',
  children: [
    { name: 'MODELS',
      children: [
        { name: 'STORAGE' },
        { name: 'REMOTE', terminal: true },
      ],
     },
    { name: 'ML',
      children: [
        { name: 'DIFFUSION' },
        { name: 'LLM' },
        { name: 'NODE FUNCTION' },
      ],
    },
    { name: 'API',
      children: [
        { name: 'CLIENT',
          children: [
            { name: 'UI (GRAPH/NODES)' },
            { name: 'SKINS', terminal:true,
            },],},
            { name: 'I18N' },
            { name: 'NODE DRAW' },
            { name: 'OMNI CTRL' },
            ],},
    { name: 'SANDBOX',
      children: [
        { name: 'EXTENSIONS', terminal: true, },
        { name: 'CUSTOM NODES', terminal: true,  },
      ]
    },          
],}

const defaultMargin = { top: 50, left: 30, right: 30, bottom: 90 };

export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default function Example({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
}: LinkTypesProps) {
  const [layout, setLayout] = useState<string>('polar');
  const [orientation, setOrientation] = useState<string>('horizontal');
  const [linkType, setLinkType] = useState<string>('step');
  const [stepPercent, setStepPercent] = useState<number>(0.5);
  const forceUpdate = useForceUpdate();

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;

  if (layout === 'polar') {
    origin = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    sizeWidth = 2 * Math.PI;
    sizeHeight = Math.min(innerWidth, innerHeight) / 1.8;
  } else {
    origin = { x: 0, y: 0 };
    if (orientation === 'vertical') {
      sizeWidth = innerWidth;
      sizeHeight = innerHeight;
    } else {
      sizeWidth = innerHeight;
      sizeHeight = innerWidth;
    }
  }

  const LinkComponent = getLinkComponent({ layout, linkType, orientation });

/*
      <LinkControls
        layout={layout}
        orientation={orientation}
        linkType={linkType}
        stepPercent={stepPercent}
        setLayout={setLayout}
        setOrientation={setOrientation}
        setLinkType={setLinkType}
        setStepPercent={setStepPercent}
      />
*/
  return totalWidth < 10 ? null : (
    <div className="tree">

      <svg width={totalWidth} height={totalHeight}>
        <LinearGradient id="links-gradient" from="#ff46aa" to="#ff46aa00" />
        <rect width={totalWidth} height={totalHeight} rx={14} fill="#54688a77" />
        <Group top={margin.top} left={margin.left}>
          <Tree
            root={hierarchy(data, (d) => (d.isExpanded ? null : d.children))}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? .5 : .5) / a.depth}
          >
            {(tree) => (
              <Group top={origin.y} left={origin.x}>
                {tree.links().map((link, i) => (
                  <LinkComponent
                    key={i}
                    data={link}
                    percent={stepPercent}
                    stroke="#34E4EA"
                    strokeWidth="2"
                    fill="none"
                  />
                ))}

                {tree.descendants().map((node, key) => {
                  const width = 30;
                  const height = 20;

                  let top: number;
                  let left: number;
                  if (layout === 'polar') {
                    const [radialX, radialY] = pointRadial(node.x, node.y);
                    top = radialY;
                    left = radialX;
                  } else if (orientation === 'vertical') {
                    top = node.y;
                    left = node.x;
                  } else {
                    top = node.x;
                    left = node.y;
                  }

                  return (
                    <Group top={top} left={left} key={key}>
                      {node.depth === 0 && (
                        <circle
                          r={40}
                          fill="url('#links-gradient')"
                          onClick={() => {
                            node.data.isExpanded = !node.data.isExpanded;
                            console.log(node);
                            forceUpdate();
                          }}
                        />
                      )}
                      {node.depth !== 0 && (
                        <circle
                          r={25}
                          height={height}
                          width={width}
                          y={-height / 2}
                          x={-width / 2}
                          fill="#272b4d00"
                          stroke={ node.data.terminal ? '#ccff00' : node.data.children ? '#F02FC2' : '#34E4EA'}
                          strokeWidth={11}
                          strokeDasharray={node.data.children ? '1' : '1'}
                          strokeOpacity={node.data.children ? 1 : 1}
                          rx={node.data.children ? 0 : 10}
                          onClick={() => {
                            node.data.isExpanded = !node.data.isExpanded;
                            console.log(node);
                            forceUpdate();
                          }}
                          className="terminal"
                        />
                      )}
                      <text
                        dy="1.33em"
                        fontSize={12}
                        fontFamily="Helvetica, Sans"
                        textAnchor="center"
                        style={{ pointerEvents: 'none' }}
                        fill={node.depth === 0 ? '#FFFFFF' : node.children ? '#FFFFFF' : '#FFFFFF'}
                      >
                        {node.data.name}
                      </text>
                    </Group>
                  );
                })}
              </Group>
            )}
          </Tree>
        </Group>
      </svg>
    </div>
  );
}