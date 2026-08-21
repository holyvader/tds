import './App.css';
import '@mantine/core/styles.css';
import { CurrencyConverterDataProvider } from '@features/currencies/component';
import { Paper, Title } from './designSystem/component';
import { ThemeProvider } from './designSystem/theme';

const App = () => {
  return (
    <ThemeProvider>
      <div className="content">
        <Paper
          shadow="xs"
          radius="sm"
          p="xl"
          className="w-full max-w-2xl mt-16 mx-auto"
        >
          <Title mb="xl">Currency Converter</Title>
          <CurrencyConverterDataProvider />
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default App;
