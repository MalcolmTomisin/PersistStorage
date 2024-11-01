import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  Text,
  View,
  useColorScheme,
  Button,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {addFeature, generateComplexFeature, RootState} from './store';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

export const List = () => {
  const dispatch = useDispatch();
  const features = useSelector((state: RootState) => state.features);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <FlatList
      data={Object.keys(features)}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="App without Asyncstorage">
            Click on Button to save data in local state
          </Section>
          <View style={styles.buttonContainer}>
            <Button
              title="Save Data"
              onPress={() => {
                const rand = Math.random();
                for (let i = 0; i < 3; i++) {
                  setTimeout(() => {
                    dispatch(
                      addFeature(
                        `${Date.now}`,
                        generateComplexFeature(i + rand),
                      ),
                    );
                  }, 100 * i);
                }
              }}
            />
          </View>
        </View>
      }
      renderItem={({item, index}) => (
        <Section key={index} title={`Feature ${item}`}>
          {`Section ${index + 1}`}
        </Section>
      )}
      style={backgroundStyle}
    />
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  buttonContainer: {
    padding: 20,
  },
  container: {
    flex: 1,
  },
});
