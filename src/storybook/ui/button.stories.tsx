
import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "@/components/ui/button"

type PagePropsAndCustomArgs = React.ComponentProps<typeof Button> & { text: string };

const meta: Meta<PagePropsAndCustomArgs> = {
  title: "Components/Button",
  component: Button,
  render: ({ text, ...args }) => (
    <Button {...args}>
      {text}
    </Button>
  )
}

export default meta

type Story = StoryObj<PagePropsAndCustomArgs>

export const Primary: Story = {
  args: {
    text: 'Sumbit',
    size: 'lg',
    variant: 'default'
  },
}
