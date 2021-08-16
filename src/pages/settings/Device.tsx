import React from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { connection } from '@app/core/connection';
import { useAppSelector } from '@app/hooks/redux';
import { Button } from '@components/generic/Button';
import { Input } from '@components/generic/Input';
import { PrimaryTemplate } from '@components/templates/PrimaryTemplate';
import { MenuIcon, SaveIcon } from '@heroicons/react/outline';
import type { Protobuf } from '@meshtastic/meshtasticjs';

export interface DeviceProps {
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Device = ({ navOpen, setNavOpen }: DeviceProps): JSX.Element => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.meshtastic.user);

  const { register, handleSubmit, formState } = useForm<Protobuf.User>({
    defaultValues: user,
  });

  const onSubmit = handleSubmit((data) => {
    void connection.setOwner(data);
  });

  return (
    <PrimaryTemplate
      title="Device"
      tagline="Settings"
      button={
        <Button
          icon={<MenuIcon className="w-5 h-5" />}
          onClick={(): void => {
            setNavOpen(!navOpen);
          }}
          circle
        />
      }
      footer={
        <Button
          className="px-10 ml-auto"
          icon={<SaveIcon className="w-5 h-5" />}
          disabled={!formState.isDirty}
          active
          border
        >
          {t('strings.save_changes')}
        </Button>
      }
    >
      <div className="w-full max-w-3xl md:max-w-xl">
        <form className="space-y-2" onSubmit={onSubmit}>
          <Input label={'Device Name'} {...register('longName')} />
        </form>
      </div>
    </PrimaryTemplate>
  );
};