import React from 'react'
import SignUpComponent from '@/components/pages/(auth)/signup/signup'
import { Metadata } from 'next';
import { MetaTags } from '@/contants/meta-data';

export const metadata: Metadata = MetaTags?.signUpPage;

export default function SignUpPage() {
  return (
    <SignUpComponent/>
  )
}
