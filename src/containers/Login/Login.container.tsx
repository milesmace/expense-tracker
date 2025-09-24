import { useMemo, type FC } from 'react';

import { DiscordIcon, GitHubIcon, GoogleIcon } from '@/components/icons';
import { Button } from '@/components/ui';
import { Each } from '@/components/utils';
import { supabase } from '@/supabase';

export const Login: FC = () => {
  const loginBtnsConfig = useMemo(
    () => [
      {
        id: 'google',
        name: 'Google',
        icon: <GoogleIcon className="size-5" />,
        onClick: async () => {
          await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/login`,
            },
          });
        },
      },
      {
        id: 'github',
        name: 'GitHub',
        icon: <GitHubIcon className="fill-foreground size-5" />,
        onClick: async () => {
          await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
              redirectTo: `${window.location.origin}/login`,
            },
          });
        },
      },
      {
        id: 'discord',
        name: 'Discord',
        icon: <DiscordIcon className="size-5" />,
        onClick: async () => {
          await supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
              redirectTo: `${window.location.origin}/login`,
            },
          });
        },
      },
    ],
    [],
  );
  return (
    <div className="bg-background/80 flex h-full flex-col items-center justify-center gap-8 rounded-lg border px-8 py-12 shadow-lg">
      {/* Title */}
      <h1 className="text-xl md:text-2xl">Login to your account</h1>

      {/* Divider */}
      <div className="flex w-[80%] items-center gap-4">
        <hr className="border-foreground/20 flex-grow border-t" />
        <p className="text-foreground/60 text-xs whitespace-nowrap">
          Continue with
        </p>
        <hr className="border-foreground/20 flex-grow border-t" />
      </div>

      {/* Buttons */}
      <div className="flex w-full flex-col gap-4 text-lg">
        <Each
          of={loginBtnsConfig}
          render={(item) => (
            <Button
              key={item.id}
              variant="outline"
              className="text-foreground/70 cursor-pointer text-sm"
              onClick={item.onClick}
            >
              Continue with {item.name}
              {item.icon}
            </Button>
          )}
        />
      </div>
    </div>
  );
};
