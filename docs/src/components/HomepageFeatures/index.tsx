import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Community',
    Svg: require('@site/static/img/person.svg').default,
    description: (
      <>
        Community is at the heart of this project. We strive to align every contributor’s goals with
        the project’s mission
      </>
    ),
  },
  {
    title: 'Code quality',
    Svg: require('@site/static/img/code.svg').default,
    description: (
      <>
        TWC uphold industry standards and embrace modern development trends, keeping code quality
        and best practices at the forefront.
      </>
    ),
  },
  {
    title: 'Innovation',
    Svg: require('@site/static/img/zap.svg').default,
    description: (
      <>
        TWC bases its progress on research and experimentation, choosing our direction with care. We
        celebrate innovation and embrace bold, disruptive ideas.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
