import React, { ChangeEvent } from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { SecureSignalKDataSourceOptions, SignalKDataSourceOptions } from './types';
import { InlineField, InlineSwitch, Input, SecretInput } from '@grafana/ui';

interface Props extends DataSourcePluginOptionsEditorProps<SignalKDataSourceOptions, SecureSignalKDataSourceOptions> {}

export function ConfigEditor(props: Props) {
  const { onOptionsChange, options } = props;
  const { jsonData, secureJsonFields, secureJsonData } = options;

  const onHostnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...jsonData,
        hostname: event.target.value,
      },
    });
  };

  const onSSLChange = (event: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...jsonData,
        ssl: !!event.target.value,
      }
    });
  }

  const onTokenChange = (event: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({
      ...options,
      secureJsonData: {
        token: event.target.value,
      },
    });
  };

  const onTokenReset = () => {
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        token: false,
      },
      secureJsonData: {
        ...options.secureJsonData,
        token: '',
      },
    });
  };

  const onUseAuthChange = (event: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...jsonData,
        useAuth: !!event.target.value,
      }
    });
  }

  return (
    <>
      <InlineSwitch
        label='SSL'
        onChange={onSSLChange}
        value={!!jsonData.ssl}
      />
      <InlineField label="Server address" labelWidth={10} interactive>
        <Input
          id="config-editor-hostname"
          onChange={onHostnameChange}
          value={jsonData.hostname}
          placeholder="Signal K server hostname/ip address"
          width={20}
        />
      </InlineField>
      <InlineSwitch
        label='Use authentication'
        onChange={onUseAuthChange}
        value={!!jsonData.useAuth}
      />
      <InlineField label="Authentication token" labelWidth={10} interactive>
        <SecretInput
          required
          id="config-editor-auth-token"
          isConfigured={secureJsonFields.token}
          value={secureJsonData?.token}
          placeholder="Access token"
          width={20}
          onReset={onTokenReset}
          onChange={onTokenChange}
        />
      </InlineField>
    </>
  );
}
