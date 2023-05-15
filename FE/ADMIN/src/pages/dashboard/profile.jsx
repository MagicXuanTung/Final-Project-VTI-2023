import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Switch,
  Tooltip,
} from "@material-tailwind/react";
import {PencilIcon} from "@heroicons/react/24/solid";

import ProfileInfoCard from "../../widgets/cards/profile-info-card";


import platformSettingsData from "../../data/platform-settings-data";



export function Profile() {
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/Magic gaming.jpg"
                size="3xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                   MAGIC XUAN TUNG
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  CEO / Co-Founder
                </Typography>
              </div>
            </div>
            
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Platform Settings
              </Typography>
              <div className="flex flex-col gap-12">
                {platformSettingsData.map(({ title, options }) => (
                  <div key={title}>
                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                      {title}
                    </Typography>
                    <div className="flex flex-col gap-6">
                      {options.map(({ checked, label }) => (
                        <Switch
                          key={label}
                          id={label}
                          label={label}
                          defaultChecked={checked}
                          labelProps={{
                            className: "text-sm font-normal text-blue-gray-500",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ProfileInfoCard
              title="Profile Information"
              description="Hi, I'm TRANXUANTUNG, Don't Forget To Share And Subscribe Đừng quên để lại 1 Sub và Follow nha ❤️
              Follow Me : 
              
              ~ Fanpage Live Stream: https://www.facebook.com/XuanTungMagic61K3
              ~ NimoTV: https://www.nimo.tv/live/53411053
              ~ Youtube: https://www.youtube.com/c/MagicXuânTùngOfficial
              ~ Twitch: https://www.twitch.tv/magicxuantung
              ~ Facebook: https://www.facebook.com/XT612003
              ~ Instagram: https://www.instagram.com/trxuantung
              #Discord Giao Lưu: https://discord.gg/g5sBRyHZsT
              
               Ủng Hộ Tôi - Donate :
              $ Playerduo: https://playerduo.com/magicxuantung (Phổ biến - Popular)
              $ Streamlabs: https://streamlabs.com/magicofficialchannel ( Quốc tế - international)
              $ WeScan: https://app.wescan.vn/MagicXuanTung (Banking ko chiết khấu)
              $ Banking: 9704 2292 0594 8230 618 - Trần Xuân Tùng MB Bank (Ko thông báo lên stream)."
              details={{
                "first name": "TRAN XUAN TUNG",
                mobile: "0374551092",
                email: "123@Gmail.com",
                location: "VN",
            
              }}
              action={
                <Tooltip content="Edit Profile">
                  <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                </Tooltip>
              }
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
